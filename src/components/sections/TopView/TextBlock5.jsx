import { forwardRef } from "react"

const TextBlock5 = forwardRef(function TextBlock5(props, ref) {
  return (
    <div ref={ref} className="max-w-[130px]">
      <h2 className="leading-relaxed text-left  font-pt-sans">
        <span className="font-bold">Вход — </span>
        через основное помещение с зоной досмотра.
      </h2>
    </div>
  )
})

export default TextBlock5
