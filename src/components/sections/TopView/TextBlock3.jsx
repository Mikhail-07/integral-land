import { forwardRef } from "react"

const TextBlock3 = forwardRef(function TextBlock3(props, ref) {
  return (
    <div ref={ref} className="w-[286px]">
      <h2 className=" leading-relaxed text-left pb-2 font-pt-sans">
        Организация системы пропускного режима (постоянные/временные
        идентификаторы).
      </h2>
    </div>
  )
})

export default TextBlock3
