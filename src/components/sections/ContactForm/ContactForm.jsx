import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", task: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (isSubmitted) {
    return (
      <section id="order" className="w-full bg-brand-deep-teal py-16">
        <div className="max-w-2xl mx-auto px-4 ">
          <div className="bg-brand-white rounded-2xl p-8 shadow-xl">
            <div className="w-14 h-14 bg-brand-amber rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-brand-deep-teal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-deep-teal mb-4">
              Спасибо за обращение!
            </h2>
            <p className="text-grey-8">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="order" className="w-full bg-panel py-16 ">
      <div className="mx-auto px-4 max-w-6xl">
        <h2 className=" text-heading-3 mb-4">
          Хотите убедиться, что это решение вам подходит?
        </h2>
        <p className="font-pt-sans mb-8">
          Мы на{" "}
          <span className="text-brand-amber font-semibold">99% уверены</span>,
          что ВКПП «Интеграл» закроет вашу задачу. Если сомневаетесь — просто
          укажите, где и как вы планируете его использовать. Мы вышлем
          техническую документацию и покажем, как модуль применяется в вашем
          случае. Если задача действительно нестандартная — это зона нашего
          профессионального интереса.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-brand-panel rounded-xl max-w-2xl "
        >
          <input
            type="email"
            name="email"
            placeholder="name@yandex.ru"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-md px-4 py-3 bg-brand-deep-teal  placeholder-grey-6 focus:outline-none focus:ring-2 focus:ring-brand-amber"
          />
          <textarea
            name="task"
            placeholder="Ваша нестандартная ситуация"
            value={formData.task}
            onChange={handleChange}
            rows={4}
            className="rounded-md px-4 py-3 bg-brand-deep-teal placeholder-grey-6 focus:outline-none focus:ring-2 focus:ring-brand-amber resize-none"
          />
          <button
            type="submit"
            disabled={!isValidEmail(formData.email) || isSubmitting}
            className="self-end bg-brand-amber text-brand-deep-teal font-semibold rounded-lg py-3 px-8 hover:bg-brand-amber/90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Отправляем..." : "Получить материалы"}
          </button>
        </form>
      </div>
    </section>
  )
}
