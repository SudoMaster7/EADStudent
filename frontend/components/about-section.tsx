export function AboutSection() {
  return (
    <section className="py-16 bg-blue-50 rounded-xl p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img src="/professores.png?height=400&width=500" alt="Sobre a FUNDEC" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-blue-800">Sobre a FUNDEC</h2>
            <p className="text-lg text-gray-700">
              A Fundação de Apoio à Escola Técnica (FUNDEC) de Duque de Caxias é uma instituição comprometida com a
              formação técnica e profissional de qualidade. Há mais de 20 anos, preparamos profissionais qualificados
              para o mercado de trabalho.
            </p>
            <p className="text-lg text-gray-700">
              Nossa plataforma de ensino online traz a mesma qualidade dos cursos presenciais para o ambiente virtual,
              permitindo que mais pessoas tenham acesso à educação profissionalizante de excelência.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
