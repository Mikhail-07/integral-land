export default function TextBlock() {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-full px-10 sm:max-w-xl sm:px-0 z-12">
      <h2 className="text-body text-white mb-6 leading-relaxed text-left">
        <span className="text-brand-amber">Быстрое развёртывание </span>
        <span>ВКПП </span>
        <span className="text-brand-amber">
          с полным комплектом оборудования
        </span>
        <span>, соответствие нормативам МВД и ФСБ.</span>
      </h2>

      <p className="font-pt-sans text-white/90 leading-relaxed">
        Все технические средства охраны и обеспечения транспортной безопасности
        заранее интегрированы, подключены и протестированы. Заказчику не
        требуется внешняя настройка, отдельные интеграторы или сложные
        пусконаладочные работы.
      </p>
    </div>
  )
}
