'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const particleCount = 400
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const pinkColor = new THREE.Color(0xf9a8d4)
    const lavenderColor = new THREE.Color(0xc4b5fd)
    const mintColor = new THREE.Color(0x99f6e4)
    const roseColor = new THREE.Color(0xfda4af)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const colorChoice = Math.random()
      let color: THREE.Color
      if (colorChoice < 0.25) {
        color = pinkColor
      } else if (colorChoice < 0.5) {
        color = lavenderColor
      } else if (colorChoice < 0.75) {
        color = mintColor
      } else {
        color = roseColor
      }
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 4 + 1.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const lineCount = 30
    const linePositions = new Float32Array(lineCount * 6)
    const lineColors = new Float32Array(lineCount * 6)

    for (let i = 0; i < lineCount; i++) {
      const x1 = (Math.random() - 0.5) * 12
      const y1 = (Math.random() - 0.5) * 12
      const z1 = (Math.random() - 0.5) * 12
      const x2 = x1 + (Math.random() - 0.5) * 2
      const y2 = y1 + (Math.random() - 0.5) * 2
      const z2 = z1 + (Math.random() - 0.5) * 2

      linePositions[i * 6] = x1
      linePositions[i * 6 + 1] = y1
      linePositions[i * 6 + 2] = z1
      linePositions[i * 6 + 3] = x2
      linePositions[i * 6 + 4] = y2
      linePositions[i * 6 + 5] = z2

      const lineColor = Math.random() < 0.5 ? pinkColor : lavenderColor
      lineColors[i * 6] = lineColor.r
      lineColors[i * 6 + 1] = lineColor.g
      lineColors[i * 6 + 2] = lineColor.b
      lineColors[i * 6 + 3] = lineColor.r
      lineColors[i * 6 + 4] = lineColor.g
      lineColors[i * 6 + 5] = lineColor.b
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      particles.rotation.y = elapsed * 0.03
      particles.rotation.x = elapsed * 0.01
      lines.rotation.y = elapsed * 0.03
      lines.rotation.x = elapsed * 0.01

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      const posAttr = geometry.getAttribute('position')
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3 + 1
        const y = posAttr.array[ix] as number
        posAttr.array[ix] = y + Math.sin(elapsed + i * 0.008) * 0.002
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      rafId.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}
