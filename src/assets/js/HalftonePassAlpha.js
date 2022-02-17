import {
  ShaderMaterial,
  UniformsUtils
} from 'three/build/three.module.js'
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import { HalftoneShaderAlpha } from './HalftoneShaderAlpha.js'

/**
 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
 */

class HalftonePassAlpha extends Pass {

  constructor(width, height, params) {

    super()

    if (HalftoneShaderAlpha === undefined) {

      console.error('THREE.HalftonePassAlpha requires HalftoneShaderAlpha')

    }

    this.uniforms = UniformsUtils.clone(HalftoneShaderAlpha.uniforms)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader: HalftoneShaderAlpha.fragmentShader,
      vertexShader: HalftoneShaderAlpha.vertexShader
    })

    // set params
    this.uniforms.width.value = width
    this.uniforms.height.value = height

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key) && Object.prototype.hasOwnProperty.call(this.uniforms, key)) {
        this.uniforms[key].value = params[key]
      }
    }

    this.fsQuad = new FullScreenQuad(this.material)

  }

  render(renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/) {

    this.material.uniforms['tDiffuse'].value = readBuffer.texture

    if (this.renderToScreen) {

      renderer.setRenderTarget(null)
      this.fsQuad.render(renderer)

    } else {

      renderer.setRenderTarget(writeBuffer)
      if (this.clear) renderer.clear()
      this.fsQuad.render(renderer)

    }

  }

  setSize(width, height) {

    this.uniforms.width.value = width
    this.uniforms.height.value = height

  }

}

export { HalftonePassAlpha }