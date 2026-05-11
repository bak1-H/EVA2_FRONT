function Reviews() {
  return (
    <div className="bg-white  sm:py-10">
      <div className="mx-auto text-center ">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Empresas que confían en nosotros
        </h2>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Apple</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Integración estable</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">HyperX</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Logística y despacho</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Logitech</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Operación sincronizada</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
