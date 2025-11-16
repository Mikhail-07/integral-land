import { forwardRef } from "react"

const TextBlock2 = forwardRef(function TextBlock2(props, ref) {
  return (
    <div ref={ref} className="w-[286px]">
      <h2 className="text-body leading-relaxed text-left pb-2 font-pt-sans">
        <span className="font-bold">
          Сопряжение с существующими (смежными) системами{" "}
        </span>
        обеспечения безопасности и централизованной системой контроля и
        управления доступом на ОТИ.
      </h2>
    </div>
  )
})

export default TextBlock2
