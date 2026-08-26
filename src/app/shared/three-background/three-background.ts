import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: `<canvas #canvas class="three-canvas"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
      }
      .three-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class ThreeBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private particles?: THREE.Points;
  private core?: THREE.Group;
  private frameId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private host!: HTMLElement;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.host = this.canvasRef.nativeElement.parentElement as HTMLElement;
    this.init();
    this.animate();
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    this.camera.position.z = 9;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);

    // --- Starfield particles ---
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8b7dff,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);

    // --- Rotating wireframe core (icosahedron inside dodecahedron) ---
    this.core = new THREE.Group();

    const icoGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    this.core.add(ico);

    const dodecaGeo = new THREE.DodecahedronGeometry(3.1, 0);
    const dodecaMat = new THREE.MeshBasicMaterial({
      color: 0x37e6c8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
    this.core.add(dodeca);

    this.core.position.set(0, 0, 0);
    this.scene.add(this.core);

    const light = new THREE.PointLight(0x7c5cff, 2, 20);
    light.position.set(5, 5, 5);
    this.scene.add(light);
  }

  private animate = (): void => {
    this.frameId = requestAnimationFrame(this.animate);
    if (!this.renderer || !this.scene || !this.camera) return;

    if (this.core) {
      this.core.rotation.y += 0.0022;
      this.core.rotation.x += 0.0009;
    }
    if (this.particles) {
      this.particles.rotation.y += 0.0004;
    }

    this.camera.position.x += (this.mouseX * 1.2 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouseY * 1.2 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = (event.clientY / window.innerHeight) * 2 - 1;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer || !this.camera || !this.host) return;
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    this.renderer?.dispose();
  }
}
