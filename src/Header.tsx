export const Header = () => (
<header className="mb-8 text-center flex flex-col">
    <img 
    src={`${import.meta.env.BASE_URL}logoMinisterio.svg`}
    alt="Logo Consulado"
    className="items-center"
    >
    </img>
    <h1 className="text-3xl font-bold text-blue-900 m-2">Consulado de España en Buenos Aires</h1>
    <p className="text-slate-600">Asistente de Determinación de Nacionalidad Española</p>
</header>
)