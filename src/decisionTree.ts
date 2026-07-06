interface Option {
  label: string;
  nextStepId?: string | null;
  result?: string;
}

interface Step {
  question: string;
  options: Record<string, Option>;
}

interface DecisionTree {
  [key: string]: Step;
}

const DECISION_TREE: DecisionTree = {
  start: {
    question: '¿Quién es el antepasado español?',
    options: {
      padre: { label: 'Padre', nextStepId: 'padre_nacio' },
      madre: { label: 'Madre', nextStepId: 'madre_nacio' },
      abuelos: {
        label: 'Abuelo o Abuela nacido en España',
        nextStepId: 'abuelo_naturalizo',
      },
    },
  },
  // PADRE //
  padre_nacio: {
    question: '¿Dónde nació su padre?',
    options: {
      argentina: { label: 'Argentina', nextStepId: 'padre_era_espanol' },
      espana: { label: 'España', nextStepId: 'padre_naturalizo' },
    },
  },
  padre_naturalizo: {
    question: '¿Su padre se naturalizó Argentino?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1960' },
      si: { label: 'Sí', nextStepId: 'adquirio_1978' },
    },
  },
  ud_nacio_1960: {
    question: '¿Ud. nació antes del 29/12/1960?',
    options: {
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
      si: { label: 'Sí', nextStepId: 'ud_nacio_1941' },
    },
  },
  ud_nacio_1941: {
    question: '¿Ud. nació antes del 01/01/1941?',
    options: {
      no: { label: 'No', nextStepId: 'es_mujer' },
      si: { label: 'Sí', result: 'RECUPERA' },
    },
  },
  es_mujer: {
    question: '¿Ud. es mujer?',
    options: {
      no: { label: 'No', nextStepId: 'ud_hizo_servicio_militar' },
      si: { label: 'Sí', result: 'RECUPERA' },
    },
  },
  ud_hizo_servicio_militar: {
    question: '¿Ud. hizo el servicio militar?',
    options: {
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
      si: { label: 'Sí', result: 'RECUPERA' },
    },
  },
  adquirio_1978: {
    question: '¿Adquirió la nacionalidad antes del 29/12/1978?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1960' },
      si: { label: 'Sí', nextStepId: 'ud_habia_nacido' },
    },
  },
  ud_habia_nacido: {
    question: '¿Ud. ya había nacido?',
    options: {
      no: { label: 'No', result: 'OPCION' },
      si: { label: 'Sí', nextStepId: 'ud_mayor_edad' },
    },
  },
  ud_mayor_edad: {
    question: '¿Ud. era mayor de edad?',
    options: {
      no: { label: 'No', result: 'RECUPERA' },
      si: { label: 'Sí', nextStepId: 'ud_nacio_1960' },
    },
  },
  padre_era_espanol: {
    question: 'Su padre:',
    options: {
      no_era: {
        label: 'adquirió la nacionalidad española por residencia, carta de naturaleza, opción o recuperación',
        nextStepId: 'ud_era_menor',
      },
      era: {
        label: 'era español cuando ud. nació',
        nextStepId: 'ud_nacio_1960_b',
      },
    },
  },
  ud_era_menor: {
    question: '¿Ud. era menor cuando lo hizo?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_19_o_menos' },
    },
  },
  ud_tiene_19_o_menos: {
    question: '¿Ud. tiene hoy 19 años o menos?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  ud_nacio_1960_b: {
    question: '¿Ud. nació antes del 29/12/1960?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
      si: { label: 'Sí', nextStepId: 'ud_nacio_1941_b' },
    },
  },
  ud_nacio_1941_b: {
    question: '¿Ud. nació antes del 01/01/1941?',
    options: {
      no: { label: 'No', nextStepId: 'es_mujer_b' },
      si: { label: 'Sí', result: 'DISPENSA' },
    },
  },
  es_mujer_b: {
    question: '¿Ud. es mujer?',
    options: {
      no: { label: 'No', nextStepId: 'ud_hizo_servicio_militar_b' },
      si: { label: 'Sí', result: 'DISPENSA' },
    },
  },
  ud_hizo_servicio_militar_b: {
    question: '¿Ud. hizo el servicio militar?',
    options: {
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
      si: { label: 'Sí', result: 'DISPENSA' },
    },
  },
  ud_nacio_1985: {
    question: '¿Ud. nació antes del 09/01/1985?',
    options: {
      no: { label: 'No', nextStepId: 'ud_tiene_20_o_menos' },
      si: { label: 'Sí', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  ud_tiene_20_o_menos: {
    question: '¿Ud. tiene hoy 20 años o menos?',
    options: {
      no: { label: 'No', result: 'DISPENSA' },
      si: { label: 'Sí', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  // MADRE //
  madre_nacio: {
    question: '¿Dónde nació su madre?',
    options: {
      argentina: { label: 'Argentina', nextStepId: 'madre_era_espanola' },
      espana: { label: 'España', nextStepId: 'madre_estaba_casada' },
    },
  },
  madre_estaba_casada: {
    question: '¿Su madre estaba casada cuando ud. nació?',
    options: {
      si: { label: 'Sí', nextStepId: 'caso_1954_a' },
      no: { label: 'No', nextStepId: 'caso_1954_b' },
      nunca: { label: 'Nunca se casó', nextStepId: 'padre_reconocio' },
    },
  },
  caso_1954_a: {
    question: '¿Su madre se casó antes de 1954?',
    options: {
      no: { label: 'No', nextStepId: 'caso_con_argentino_a' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  caso_1954_b: {
    question: '¿Su madre se casó antes de 1954?',
    options: {
      no: { label: 'No', nextStepId: 'caso_con_argentino_b' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  caso_con_argentino_a: {
    question: '¿Su madre se casó con un argentino?',
    options: {
      no: { label: 'No', result: 'CONSULTA' },
      si: { label: 'Sí', nextStepId: 'madre_naturalizo_a' },
    },
  },
  caso_con_argentino_b: {
    question: '¿Su madre se casó con un argentino?',
    options: {
      no: { label: 'No', nextStepId: 'caso_1975' },
      si: { label: 'Sí', nextStepId: 'madre_naturalizo_a' },
    },
  },
  caso_1975: {
    question: '¿Su madre se casó antes de 1975?',
    options: {
      no: { label: 'No', nextStepId: 'madre_naturalizo_a' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  madre_naturalizo_a: {
    question: '¿Su madre se naturalizó argentina?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1978_a' },
      si: { label: 'Sí', nextStepId: 'madre_adquirio_1978_a' },
    },
  },
  madre_adquirio_1978_a: {
    question:
      '¿Su madre adquirió la nacionalidad argentina antes del 29/12/1978?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1978_a' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  ud_nacio_1978_a: {
    question: '¿Ud. nació antes del 29/12/1978?',
    options: {
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  padre_reconocio: {
    question: '¿Ud. fue reconocido por su padre?',
    options: {
      no: { label: 'No', nextStepId: 'madre_naturalizo_b' },
      si: { label: 'Sí', result: 'CONSULTA' },
    },
  },
  madre_naturalizo_b: {
    question: '¿Su madre se naturalizó argentina?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1960' },
      si: { label: 'Sí', nextStepId: 'adquirio_1978' },
    },
  },
  madre_era_espanola: {
    question: 'Su madre:',
    options: {
      no_era: {
        label: 'adquirió la nacionalidad española por residencia, carta de naturaleza, opción o recuperación',
        nextStepId: 'ud_era_menor',
      },
      era: {
        label: 'era española cuando ud. nació',
        nextStepId: 'ud_nacio_1978_b',
      },
    },
  },
  ud_nacio_1978_b: {
    question: '¿Ud. nació antes del 29/12/1978?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
      si: { label: 'Sí', result: 'OPCION' },
    },
  },
  // ABUELOS //
  abuelo_naturalizo: {
    question: '¿Adquirió la nacionalidad Argentina?',
    options: {
      no: { label: 'No', nextStepId: 'cual_abuelo' },
      si: { label: 'Sí', nextStepId: 'antes_de_1978' },
    },
  },
  antes_de_1978: {
    question: '¿Antes del 29/12/1978?',
    options: {
      no: { label: 'No', nextStepId: 'cual_abuelo' },
      si: { label: 'Sí', nextStepId: 'padre_madre_habia_nacido' },
    },
  },
  cual_abuelo: {
    question: 'Se trata de su:',
    options: {
      abuelo_paterno: {
        label: 'Abuelo paterno',
        nextStepId: 'padre_nacio_arg_1960',
      },
      abuelo_materno: {
        label: 'Abuelo materno',
        nextStepId: 'madre_nacio_arg_1960',
      },
      alguna_abuela: {
        label: 'Alguna abuela',
        nextStepId: 'abuela_estaba_casada',
      },
    },
  },
  padre_nacio_arg_1960: {
    question: '¿Su padre nació en Argentina antes del 29/12/1960?',
    options: {
      no: { label: 'No', nextStepId: 'padre_inscribe' },
      si: { label: 'Sí', nextStepId: 'padre_nacio_1941' },
    },
  },
  padre_nacio_1941: {
    question: '¿Su padre nació antes del 01/01/1941?',
    options: {
      no: { label: 'No', nextStepId: 'padre_hizo_servicio_militar' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos' },
    },
  },
  padre_hizo_servicio_militar: {
    question: '¿Su padre hizo el servicio militar?',
    options: {
      no: { label: 'No', nextStepId: 'padre_inscribe' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos_a' },
    },
  },
  ud_tiene_18_o_menos_a: {
    question: '¿Ud. tiene hoy 18 años o menos?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', nextStepId: 'padre_recupera' },
    },
  },
  padre_recupera: {
    question:
      'Su padre deberá recuperar la nacionalidad española mientras ud. sea menor de edad',
    options: {
      continuar: { label: 'Continuar', result: 'OPCION' },
    },
  },
  padre_inscribe: {
    question:
      'Su padre deberá inscribir su nacimiento en el Registro Civil Español',
    options: {
      continuar: { label: 'Continuar', nextStepId: 'ud_nacio_1960_b' },
    },
  },
  madre_nacio_arg_1960: {
    question: '¿Su madre nació en Argentina antes del 29/12/1960?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1978' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos_b' },
    },
  },
  ud_tiene_18_o_menos_b: {
    question: '¿Ud. tiene hoy 18 años o menos?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', nextStepId: 'madre_recupera' },
    },
  },
  ud_nacio_1978: {
    question: '¿Ud. nació antes del 29/12/1978?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', nextStepId: 'madre_inscribe' },
    },
  },
  madre_recupera: {
    question:
      'Su madre deberá recuperar la nacionalidad española mientras ud. sea menor de edad',
    options: {
      continuar: { label: 'Continuar', result: 'OPCION' },
    },
  },
  madre_inscribe: {
    question:
      'Su madre deberá inscribir su nacimiento en el Registro Civil Español',
    options: {
      continuar: { label: 'Continuar', nextStepId: 'ud_nacio_1985' },
    },
  },
  abuela_estaba_casada: {
    question: '¿Su abuela estaba casada cuando nació su padre/madre?',
    options: {
      si: { label: 'Sí', nextStepId: 'padre_madre_nacio_1978' },
      nunca: { label: 'Nunca se casó', nextStepId: 'abuelo_reconocio' },
    },
  },
  padre_madre_nacio_1978: {
    question: '¿Su padre/madre nació antes del 29/12/1978?',
    options: {
      no: { label: 'No', nextStepId: 'abuela_caso_1954' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos_c' },
    },
  },
  abuela_caso_1954: {
    question: '¿Su abuela se casó antes de 1954?',
    options: {
      no: { label: 'No', nextStepId: 'abuela_caso_1954' },
      si: { label: 'Sí', nextStepId: 'con_argentino' },
    },
  },
  ud_tiene_18_o_menos_c: {
    question: '¿Ud. tiene hoy 18 años o menos?',
    options: {
      no: { label: 'No', result: 'NO PUEDE' },
      si: { label: 'Sí', nextStepId: 'madre_adquiere_a' },
    },
  },
  madre_adquiere_a: {
    question:
      'Su madre deberá adquirir la nacionalidad española mientras ud. sea menor de edad',
    options: {
      continuar: { label: 'Continuar', result: 'OPCION' },
    },
  },
  con_argentino: {
    question: '¿Con un argentino?',
    options: {
      no: { label: 'No', result: 'CONSULTA' },
      si: { label: 'Sí', nextStepId: 'madre_adquiere_b' },
    },
  },
  madre_adquiere_b: {
    question:
      'Su madre deberá adquirir la nacionalidad española antes que usted',
    options: {
      continuar: { label: 'Continuar', nextStepId: 'ud_tiene_20_o_menos' },
    },
  },
  abuelo_reconocio: {
    question: '¿Su padre/madre fue reconocido por el padre?',
    options: {
      no: { label: 'No', nextStepId: 'padre_madre_nacio_1960' },
      si: { label: 'Sí', result: 'CONSULTA' },
    },
  },
  padre_madre_nacio_1960: {
    question: '¿Su padre/madre nació antes del 29/12/1960?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
      si: { label: 'Sí', nextStepId: 'padre_madre_nacio_1941' },
    },
  },
  padre_madre_nacio_1941: {
    question: '¿Su padre/madre nació antes del 01/01/1941?',
    options: {
      no: { label: 'No', nextStepId: 'es_su_padre' },
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos_c' },
    },
  },
  es_su_padre: {
    question: '¿Se trata de su padre?',
    options: {
      no: { label: 'No', nextStepId: 'ud_tiene_18_o_menos_c' },
      si: { label: 'Sí', nextStepId: 'padre_hizo_servicio_militar' },
    },
  },
  padre_madre_habia_nacido: {
    question: '¿Su padre/madre ya había nacido?',
    options: {
      no: { label: 'No', nextStepId: 'ud_era_mayor' },
      si: { label: 'Sí', nextStepId: 'padre_era_mayor' },
    },
  },
  ud_era_mayor: {
    question:
      '¿Ud. era mayor de edad cuando su padre adquirió la nacionalidad española?',
    options: {
      no: { label: 'No', nextStepId: 'ud_tiene_19_o_menos' },
      si: { label: 'Sí', result: 'NO PUEDE' },
    },
  },
  padre_era_mayor: {
    question:
      '¿Su padre era mayor de edad cuando su abuelo adquirió otra nacionalidad?',
    options: {
      no: { label: 'No', nextStepId: 'ud_era_mayor' },
      si: { label: 'Sí', nextStepId: 'padre_nacio_1960_b' },
    },
  },
  padre_nacio_1960_b: {
    question: '¿Su padre nació antes del 29/12/1960?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
      si: { label: 'Sí', nextStepId: 'padre_nacio_1941_b' },
    },
  },
  padre_nacio_1941_b: {
    question: '¿Su padre nació antes del 01/01/1941?',
    options: {
      no: { label: 'No', nextStepId: 'padre_hizo_servicio_militar_b' },
      si: { label: 'Sí', nextStepId: 'ud_era_mayor' },
    },
  },
  padre_hizo_servicio_militar_b: {
    question: '¿Su padre hizo el servicio militar?',
    options: {
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
      si: { label: 'Sí', nextStepId: 'ud_era_mayor' },
    },
  },
};

export { DECISION_TREE, type Option, type Step };
