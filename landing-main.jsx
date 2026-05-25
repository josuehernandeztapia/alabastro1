// landing-main.jsx — root composition

function App() {
  return (
    <>
      <L_Nav/>
      <L_AmbientBar/>

      <L_Hero/>
      <L_Statement/>
      <L_Predio/>
      <L_Recorrido/>
      <L_VideoInterlude
        src="assets/recorrido.mp4"
        label="Recorrido en sitio · mayo 2026"
        tag="alabastro1.com.mx"/>
      <L_Planos/>
      <L_Map/>
      <L_Rutas/>
      <L_Interlude reelKey="A"
        label="Reel A · cierre de tracks"
        title="Una propiedad. Dos formas de generar valor."
        sub="Las cifras de Torre Médica vs. Residencias, lado a lado en formato vertical — listo para compartir en WhatsApp."/>
      <L_Expediente/>
      <L_Interlude reelKey="E"
        label="Reel E · interludio"
        title="Hoy lo que ves. Mañana lo que puede ser."
        sub="Tres tomas reales del predio, luego el edificio que puede levantarse encima — el mismo terreno, dos tiempos."/>
      <L_Mercado/>
      <L_Compartir/>
      <L_FAQ/>
      <L_Contacto/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
