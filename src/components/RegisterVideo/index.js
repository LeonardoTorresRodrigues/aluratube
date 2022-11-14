import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsDoFrom) {
  const [values, setValues] = React.useState(propsDoFrom.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    }
  }
};

const PROJECT_URL = "https://lbcxxojwabghsjyaqdeh.supabase.co";
const PUBLICK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiY3h4b2p3YWJnaHNqeWFxZGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzcwMTksImV4cCI6MTk4NDAxMzAxOX0.9yGzDFu0Q5SaP3x7UG5GClOlR984wamzEX0HSQ69oxo";
const supabase = createClient(PROJECT_URL, PUBLICK_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel
        ? (
          <form onSubmit={(evento) => {
            evento.preventDefault();

            // Contrato entre o nosso Front e o Back-End
            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            })
            .then((oqueveio) => {
              console.log(oqueveio);
            })
            .catch((err) => {
              console.log(err);
            })

            setFormVisivel(false);
            formCadastro.clearForm();
          }}>
            <div>
              <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                X
              </button>
              <input
                placeholder="Título do vídeo"
                name="titulo"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
              />
              <input
                placeholder="URL do vídeo"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />
              <button type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        )
        : false}
    </StyledRegisterVideo>
  )
}