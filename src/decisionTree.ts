import type { Step } from './types';

const padre_recuperar = 'ATENCIÓN: Su padre deberá recuperar la nacionalidad española mientras ud. sea aún menor de edad';
const madre_recuperar = 'ATENCIÓN: Su madre deberá recuperar la nacionalidad española mientras ud. sea aún menor de edad';
const padre_inscribir = 'ATENCIÓN: Su padre deberá inscribir su nacimiento en el Registro Civil Español antes de que ud. pueda presentar su solicitud';
const madre_inscribir = 'ATENCIÓN: Su madre deberá inscribir su nacimiento en el Registro Civil Español antes de que ud. pueda presentar su solicitud';
const padre_madre_adquirir_a = 'ATENCIÓN: Su padre/madre deberá adquirir la nacionalidad española mientras ud. sea aún menor de edad'
const padre_madre_adquirir_b = 'ATENCIÓN: Su padre/madre deberá adquirir la nacionalidad española antes de que ud. pueda presentar su solicitud'

export const DECISION_TREE: Record<string, Step> = {
  start: {
    question: '¿Quién es el antepasado español?',
    options: {
      a: { label: 'Padre', nextStepId: 'padre_nacio' },
      b: { label: 'Madre', nextStepId: 'madre_nacio' },
      c: {
        label: 'Abuelo/a nacido en España',
        nextStepId: 'abuelo_naturalizo',
      },
    },
  },
  // ========= PADRE ========= //
  padre_nacio: {
    question: 'Su padre español nació en...',
    options: {
      a: { label: 'Argentina ', nextStepId: 'padre_era_espanol' },
      b: { label: 'España', nextStepId: 'padre_naturalizo' },
    },
  },
  padre_naturalizo: {
    question: 'Su padre...',
    options: {
      a: { label: 'se naturalizó Argentino', nextStepId: 'adquirio_1978' },
      b: { label: 'nunca se naturalizó Argentino', nextStepId: 'ud_nacio_1960' },
    },
  },
  ud_nacio_1960: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'ud_nacio_1941' },
      b: { label: 'a partir del 29/12/1960', result: 'NACIONALIDAD_ORIGEN' },
    },
  },
  ud_nacio_1941: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 01/01/1941', result: 'RECUPERA' },
      b: { label: 'a partir del 01/01/1941', nextStepId: 'es_mujer' },
    },
  },
  es_mujer: {
    question: 'Ud. es...',
    options: {
      a: { label: 'mujer', result: 'RECUPERA' },
      b: { label: 'varón', nextStepId: 'ud_hizo_servicio_militar' },
    },
  },
  ud_hizo_servicio_militar: {
    question: 'Ud. ...',
    options: {
      a: { label: 'hizo el Servicio Militar Argentino', result: 'RECUPERA' },
      b: { label: 'fue exceptuado del Servicio Militar Argentino', result: 'NACIONALIDAD_ORIGEN' },
    },
  },
  adquirio_1978: {
    question: 'La adquisición de la nacionalidad argentina fue...',
    options: {
      a: { label: 'antes del 29/12/1978', nextStepId: 'ud_habia_nacido' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1960' },
    },
  },
  ud_habia_nacido: {
    question: 'Cuando su padre adquirió la nacionalidad argentina ud. ...',
    options: {
      a: { label: 'ya había nacido', nextStepId: 'ud_mayor_edad' },
      b: { label: 'aún no había nacido', result: 'OPCION' },
    },
  },
  ud_mayor_edad: {
    question: 'Cuando su padre adquirió la nacionalidad argentina ud. era...',
    options: {
      a: { label: 'menor de edad', result: 'RECUPERA' },
      b: { label: 'mayor de edad', nextStepId: 'ud_nacio_1960' },
    },
  },
  padre_era_espanol: {
    question: 'Su padre...',
    options: {
      a: {
        label: 'RECUPERÓ la nacionalidad española',
        nextStepId: 'ud_era_menor_p',
      },
      b: {
        label: 'OPTÓ a la nacionalidad española',
        nextStepId: 'ud_era_menor_p',
      },
      c: {
        label: 'adquirió la nacionalidad española por RESIDENCIA o CARTA DE NATURALEZA',
        nextStepId: 'ud_era_menor_p',
      },
      d: {
        label: 'ya era español cuando ud. nació',
        nextStepId: 'ud_nacio_1960_b',
      },
    },
  },
  ud_era_menor_p: {
    question: 'Cuando su padre adquirió la nacionalidad española ud. era...',
    options: {
      a: { label: 'menor de edad', nextStepId: 'ud_tiene_19_o_menos' },
      b: { label: 'mayor de edad', result: 'NO_PUEDE' },
    },
  },
  ud_tiene_19_o_menos: {
    question: 'Ud. tiene hoy...',
    options: {
      a: { label: '19 años o menos', result: 'OPCION' },
      b: { label: '20 años o más', result: 'NO_PUEDE' },
    },
  },
  ud_nacio_1960_b: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'es_mujer_b' },
      b: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  es_mujer_b: {
    question: 'Ud. es...',
    options: {
      a: { label: 'varón', nextStepId: 'ud_nacio_1941_b' },
      b: { label: 'mujer', result: 'DISPENSA' },
    },
  },
  ud_nacio_1941_b: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 01/01/1941', result: 'DISPENSA' },
      b: { label: 'a partir del 01/01/1941', nextStepId: 'ud_hizo_servicio_militar_b' },
    },
  },
  ud_hizo_servicio_militar_b: {
    question: 'Ud. ...',
    options: {
      a: { label: 'hizo el Servicio Militar Argentino', result: 'DISPENSA' },
      b: { label: 'fue exceptuado del Servicio Militar Argentino', result: 'NACIONALIDAD_ORIGEN' },
    },
  },
  ud_nacio_1985: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 09/01/1985', result: 'NACIONALIDAD_ORIGEN' },
      b: { label: 'a partir del 09/01/1985', nextStepId: 'ud_tiene_20_o_menos' },
    },
  },
  ud_tiene_20_o_menos: {
    question: 'Ud. tiene hoy...',
    options: {
      a: { label: '20 años o menos', result: 'NACIONALIDAD_ORIGEN' },
      b: { label: '21 años o más', result: 'DISPENSA' },
    },
  },
  // ========= MADRE ========= //
  madre_nacio: {
    question: 'Su madre española nació en...',
    options: {
      a: { label: 'Argentina', nextStepId: 'madre_era_espanola' },
      b: { label: 'España', nextStepId: 'madre_estaba_casada' },
    },
  },
  madre_estaba_casada: {
    question: 'Cuando ud. nació, su madre...',
    options: {
      a: { label: 'estaba casada', nextStepId: 'caso_1954_a' },
      b: { label: 'no estaba casada', nextStepId: 'caso_1954_b' },
    },
  },
  caso_1954_a: {
    question: 'Su madre se casó...',
    options: {
      a: { label: 'antes de 1954', result: 'OPCION' },
      b: { label: 'a partir de 1954', nextStepId: 'caso_con_argentino_a' },
    },
  },
  caso_1954_b: {
    question: 'Su madre...',
    options: {
      a: { label: 'se casó antes de 1954', result: 'OPCION' },
      b: { label: 'se casó a partir de 1954', nextStepId: 'caso_con_argentino_b' },
      c: { label: 'nunca se casó', nextStepId: 'padre_reconocio' },
    },
  },
  caso_con_argentino_a: {
    question: 'Su madre...',
    options: {
      a: { label: 'se casó con argentino', nextStepId: 'madre_naturalizo_a' },
      b: { label: 'no se casó con argentino', result: 'CONSULTA' },
    },
  },
  caso_con_argentino_b: {
    question: 'Su madre...',
    options: {
      a: { label: 'se casó con argentino', nextStepId: 'madre_naturalizo_a' },
      b: { label: 'no se casó con argentino', nextStepId: 'caso_1975' },
    },
  },
  caso_1975: {
    question: 'Su madre se casó...',
    options: {
      a: { label: 'antes de 1975', result: 'OPCION' },
      b: { label: 'a partir de 1975', nextStepId: 'madre_naturalizo_a' },
    },
  },
  madre_naturalizo_a: {
    question: 'Su madre...',
    options: {
      a: { label: 'adquirió la nacionalidad argentina', nextStepId: 'madre_adquirio_1978_a' },
      b: { label: 'nunca adquirió la nacionalidad argentina', nextStepId: 'ud_nacio_1978_a' },
    },
  },
  madre_adquirio_1978_a: {
    question:
      'La adquisición de la nacionalidad argentina fue...',
    options: {
      a: { label: 'antes del 29/12/1978', result: 'OPCION' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1978_a' },
    },
  },
  ud_nacio_1978_a: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 29/12/1978', result: 'OPCION' },
      b: { label: 'a partir del 29/12/1978', result: 'NACIONALIDAD_ORIGEN' },
    },
  },
  padre_reconocio: {
    question: 'Ud. ...',
    options: {
      a: { label: 'fue reconocido por su padre', result: 'CONSULTA' },
      b: { label: 'nunca fue reconocido por su padre', nextStepId: 'madre_naturalizo_b' },
    },
  },
  madre_naturalizo_b: {
    question: 'Su madre...',
    options: {
      a: { label: 'se naturalizó argentina', nextStepId: 'adquirio_1978' },
      b: { label: 'nunca se naturalizó argentina', nextStepId: 'ud_nacio_1960' },
    },
  },
  madre_era_espanola: {
    question: 'Su madre...',
    options: {
      a: {
        label: 'RECUPERÓ la nacionalidad española',
        nextStepId: 'ud_era_menor_m',
      },
      b: {
        label: 'OPTÓ a la nacionalidad española',
        nextStepId: 'ud_era_menor_m',
      },
      c: {
        label: 'adquirió la nacionalidad española por RESIDENCIA o CARTA DE NATURALEZA',
        nextStepId: 'ud_era_menor_m',
      },
      d: {
        label: 'ya era española cuando ud. nació',
        nextStepId: 'ud_nacio_1978_b',
      },
    },
  },
  ud_era_menor_m: {
    question: 'Cuando su madre adquirió la nacionalidad española ud. era...',
    options: {
      a: { label: 'menor de edad', nextStepId: 'ud_tiene_19_o_menos' },
      b: { label: 'mayor de edad', result: 'NO_PUEDE' },
    },
  },
  ud_nacio_1978_b: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 29/12/1978', result: 'OPCION' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1985' },
    },
  },
  // ========= ABUELOS ========= //
  abuelo_naturalizo: {
    question: 'Su abuelo/a...',
    options: {
      a: { label: 'adquirió la nacionalidad argentina', nextStepId: 'antes_de_1978' },
      b: { label: 'nunca adquirió la nacionalidad argentina', nextStepId: 'cual_abuelo' },
    },
  },
  antes_de_1978: {
    question: 'Su abuelo/a adquirió la nacionalidad argentina...',
    options: {
      a: { label: 'antes del 29/12/1978', nextStepId: 'padre_madre_habia_nacido' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'cual_abuelo' },
    },
  },
  cual_abuelo: {
    question: 'Se trata de su...',
    options: {
      a: {
        label: 'abuelo paterno',
        nextStepId: 'padre_nacio_arg_1960',
      },
      b: {
        label: 'abuelo materno',
        nextStepId: 'madre_nacio_arg_1960',
      },
      c: {
        label: 'alguna de sus abuelas',
        nextStepId: 'abuela_estaba_casada',
      },
    },
  },
  padre_nacio_arg_1960: {
    question: 'Su padre nació en Argentina...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'padre_nacio_1941' },
      b: { label: 'a partir del 29/12/1960', nextStepId: 'padre_inscribe_a' },
    },
  },
  padre_nacio_1941: {
    question: 'Su padre nació...',
    options: {
      a: { label: 'antes del 01/01/1941', nextStepId: 'ud_tiene_17_o_menos_p' },
      b: { label: 'a partir del 01/01/1941', nextStepId: 'padre_hizo_servicio_militar' },
    },
  },
  padre_hizo_servicio_militar: {
    question: 'Su padre...',
    options: {
      a: { label: 'hizo el Servicio Militar Argentino', nextStepId: 'ud_tiene_17_o_menos_p' },
      b: { label: 'fue exceptuado del Servicio Militar Argentino', nextStepId: 'padre_inscribe_b' },
    },
  },
  ud_tiene_17_o_menos_p: {
    question: 'Ud. tiene hoy...',
    options: {
      a: { label: '17 años o menos', nextStepId: 'padre_recupera' },
      b: { label: '18 años o más', result: 'NO_PUEDE' },
    },
  },
  padre_recupera: {
    question: padre_recuperar,
    options: {
      a: { label: 'Continuar', result: 'OPCION' },
    },
  },
  padre_inscribe_a: {
    question: padre_inscribir,
    options: {
      a: { label: 'Continuar', nextStepId: 'ud_nacio_1985' },
    },
  },
  padre_inscribe_b: {
    question: padre_inscribir,
    options: {
      a: { label: 'Continuar', nextStepId: 'ud_nacio_1960_b' },
    },
  },
  madre_nacio_arg_1960: {
    question: 'Su madre nació...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'ud_tiene_17_o_menos_m' },
      b: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1978' },
    },
  },
  ud_tiene_17_o_menos_m: {
    question: 'Ud. tiene hoy...',
    options: {
      a: { label: '17 años o menos', nextStepId: 'madre_recupera' },
      b: { label: '18 años o más', result: 'NO_PUEDE' },
    },
  },
  ud_nacio_1978: {
    question: 'Ud. nació...',
    options: {
      a: { label: 'antes del 29/12/1978', result: 'NO_PUEDE' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'madre_inscribe' },
    },
  },
  madre_recupera: {
    question: madre_recuperar,
    options: {
      a: { label: 'Continuar', result: 'OPCION' },
    },
  },
  madre_inscribe: {
    question: madre_inscribir,
    options: {
      a: { label: 'Continuar', nextStepId: 'ud_nacio_1985' },
    },
  },
  abuela_estaba_casada: {
    question: 'Su abuela...',
    options: {
      a: { label: 'estaba casada cuando nació su padre/madre', nextStepId: 'padre_madre_nacio_1978' },
      b: { label: 'nunca se casó', nextStepId: 'abuelo_reconocio' },
    },
  },
  padre_madre_nacio_1978: {
    question: 'Su padre/madre nació...',
    options: {
      a: { label: 'antes del 29/12/1978', nextStepId: 'ud_tiene_17_o_menos' },
      b: { label: 'a partir del 29/12/1978', nextStepId: 'abuela_caso_1954' },
    },
  },
  abuela_caso_1954: {
    question: 'Su abuela se casó...',
    options: {
      a: { label: 'antes de 1954', nextStepId: 'ud_tiene_17_o_menos' },
      b: { label: 'a partir de 1954', nextStepId: 'con_argentino' },
    },
  },
  ud_tiene_17_o_menos: {
    question: 'Ud. tiene hoy...',
    options: {
      a: { label: '17 años o menos', nextStepId: 'padre_madre_adquiere_a' },
      b: { label: '18 años o más', result: 'NO_PUEDE' },
    },
  },
  padre_madre_adquiere_a: {
    question: padre_madre_adquirir_a,
    options: {
      a: { label: 'Continuar', result: 'OPCION' },
    },
  },
  con_argentino: {
    question: 'Su abuela...',
    options: {
      a: { label: 'se casó con argentino', nextStepId: 'padre_madre_adquiere_b' },
      b: { label: 'no se casó con argentino', result: 'CONSULTA' },
    },
  },
  padre_madre_adquiere_b: {
    question: padre_madre_adquirir_b,
    options: {
      a: { label: 'Continuar', nextStepId: 'ud_tiene_20_o_menos' },
    },
  },
  abuelo_reconocio: {
    question: 'Su padre/madre...',
    options: {
      a: { label: 'fue reconocido/a por el padre', result: 'CONSULTA' },
      b: { label: 'nunca fue reconocido/a por el padre', nextStepId: 'padre_madre_nacio_1960' },
    },
  },
  padre_madre_nacio_1960: {
    question: 'Su padre/madre nació...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'padre_madre_nacio_1941' },
      b: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  padre_madre_nacio_1941: {
    question: 'Su padre/madre nació...',
    options: {
      a: { label: 'antes del 01/01/1941', nextStepId: 'ud_tiene_17_o_menos' },
      b: { label: 'a partir del 01/01/1941', nextStepId: 'es_su_padre' },
    },
  },
  es_su_padre: {
    question: 'Se trata de su...',
    options: {
      a: { label: 'madre', nextStepId: 'ud_tiene_17_o_menos' },
      b: { label: 'padre', nextStepId: 'padre_hizo_servicio_militar' },
    },
  },
  padre_madre_habia_nacido: {
    question: 'Cuando su abuelo/a adquirió la nacionalidad argentina su padre/madre...',
    options: {
      a: { label: 'ya había nacido', nextStepId: 'padre_era_mayor' },
      b: { label: 'aún no había nacido', nextStepId: 'ud_era_mayor' },
    },
  },
  ud_era_mayor: {
    question:
      'Cuando su padre adquirió la nacionalidad española ud. era...',
    options: {
      a: { label: 'menor de edad', nextStepId: 'ud_tiene_19_o_menos' },
      b: { label: 'mayor de edad', result: 'NO_PUEDE' },
    },
  },
  padre_era_mayor: {
    question:
      'Cuando su abuelo adquirió otra nacionalidad distinta de la española su padre era...',
    options: {
      a: { label: 'menor de edad', nextStepId: 'ud_era_mayor' },
      b: { label: 'mayor de edad', nextStepId: 'padre_nacio_1960_b' },
    },
  },
  padre_nacio_1960_b: {
    question: 'Su padre nació...',
    options: {
      a: { label: 'antes del 29/12/1960', nextStepId: 'padre_nacio_1941_b' },
      b: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  padre_nacio_1941_b: {
    question: 'Su padre nació...',
    options: {
      a: { label: 'antes del 01/01/1941', nextStepId: 'ud_era_mayor' },
      b: { label: 'a partir del 01/01/1941', nextStepId: 'padre_hizo_servicio_militar_b' },
    },
  },
  padre_hizo_servicio_militar_b: {
    question: 'Su padre...',
    options: {
      a: { label: 'hizo el Servicio Militar Argentino', nextStepId: 'ud_era_mayor' },
      b: { label: 'fue exceptuado del Servicio Militar Argentino', nextStepId: 'ud_nacio_1985' },
    },
  },
};