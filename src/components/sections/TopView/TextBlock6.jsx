import { forwardRef } from "react"

const TextBlock6 = forwardRef(function TextBlock6(props, ref) {
  return (
    <div ref={ref} className="max-w-[130px]">
      <h2 className="leading-relaxed text-left  font-pt-sans">
        <span className="font-bold">Выход — </span> через отдельную секцию с
        турникетом.
      </h2>
    </div>
  )
})

export default TextBlock6
