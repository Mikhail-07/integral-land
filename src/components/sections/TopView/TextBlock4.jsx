import { forwardRef } from "react"

const TextBlock4 = forwardRef(function TextBlock4(props, ref) {
  return (
    <div ref={ref} className="absolute  left-10 max-w-2xl z-11">
      <h2 className="text-body text-heading-3 mb-6 leading-relaxed text-left pb-2 text-brand-amber">
        Разделение потоков
      </h2>
    </div>
  )
})

export default TextBlock4
