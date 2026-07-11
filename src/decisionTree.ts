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
    question: 'Su padre español nació en...',
    options: {
      argentina: { label: 'Argentina ', nextStepId: 'padre_era_espanol' },
      espana: { label: 'España', nextStepId: 'padre_naturalizo' },
    },
  },
  padre_naturalizo: {
    question: '¿Su padre se naturalizó Argentino?',
    options: {
      si: { label: 'Sí', nextStepId: 'adquirio_1978' },
      no: { label: 'No', nextStepId: 'ud_nacio_1960' },
    },
  },
  ud_nacio_1960: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'ud_nacio_1941' },
      no: { label: 'a partir del 29/12/1960', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  ud_nacio_1941: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 01/01/1941', result: 'RECUPERA' },
      no: { label: 'a partir del 01/01/1941', nextStepId: 'es_mujer' },
    },
  },
  es_mujer: {
    question: 'Ud. es...',
    options: {
      si: { label: 'mujer', result: 'RECUPERA' },
      no: { label: 'varón', nextStepId: 'ud_hizo_servicio_militar' },
    },
  },
  ud_hizo_servicio_militar: {
    question: '¿Ud. hizo el servicio militar argentino?',
    options: {
      si: { label: 'Sí', result: 'RECUPERA' },
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  adquirio_1978: {
    question: 'La adquisición de la nacionalidad argentina fue...',
    options: {
      si: { label: 'antes del 29/12/1978', nextStepId: 'ud_habia_nacido' },
      no: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1960' },
    },
  },
  ud_habia_nacido: {
    question: 'Cuando su padre adquirió la nacionalidad argentina ud. ...',
    options: {
      si: { label: 'ya había nacido', nextStepId: 'ud_mayor_edad' },
      no: { label: 'aún no había nacido', result: 'OPCION' },
    },
  },
  ud_mayor_edad: {
    question: 'Cuando su padre adquirió la nacionalidad argentina ud. era...',
    options: {
      no: { label: 'menor de edad', result: 'RECUPERA' },
      si: { label: 'mayor de edad', nextStepId: 'ud_nacio_1960' },
    },
  },
  padre_era_espanol: {
    question: 'Su padre...',
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
    question: '¿Ud. era menor de edad cuando su padre adquirió la nacionalidad española?',
    options: {
      si: { label: 'Sí', nextStepId: 'ud_tiene_19_o_menos' },
      no: { label: 'No', result: 'NO PUEDE' },
    },
  },
  ud_tiene_19_o_menos: {
    question: 'Ud. tiene hoy...',
    options: {
      si: { label: '19 años o menos', result: 'OPCION' },
      no: { label: '20 años o más', result: 'NO PUEDE' },
    },
  },
  ud_nacio_1960_b: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'ud_nacio_1941_b' },
      no: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  ud_nacio_1941_b: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 01/01/1941', result: 'DISPENSA' },
      no: { label: 'a partir del 01/01/1941', nextStepId: 'es_mujer_b' },
    },
  },
  es_mujer_b: {
    question: 'Ud. es...',
    options: {
      no: { label: 'varón', nextStepId: 'ud_hizo_servicio_militar_b' },
      si: { label: 'mujer', result: 'DISPENSA' },
    },
  },
  ud_hizo_servicio_militar_b: {
    question: '¿Ud. hizo el servicio militar argentino?',
    options: {
      si: { label: 'Sí', result: 'DISPENSA' },
      no: { label: 'No', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  ud_nacio_1985: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 09/01/1985', result: 'NACIONALIDAD DE ORIGEN' },
      no: { label: 'a partir del 09/01/1985', nextStepId: 'ud_tiene_20_o_menos' },
    },
  },
  ud_tiene_20_o_menos: {
    question: 'Ud. tiene hoy...',
    options: {
      si: { label: '20 años o menos', result: 'NACIONALIDAD DE ORIGEN' },
      no: { label: '21 años o más', result: 'DISPENSA' },
    },
  },
  // MADRE //
  madre_nacio: {
    question: 'Su madre española nació en...',
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
    question: 'Su madre se casó...',
    options: {
      si: { label: 'antes de 1954', result: 'OPCION' },
      no: { label: 'a partir de 1954', nextStepId: 'caso_con_argentino_a' },
    },
  },
  caso_1954_b: {
    question: 'Su madre se casó...',
    options: {
      si: { label: 'antes de 1954', result: 'OPCION' },
      no: { label: 'a partir de 1954', nextStepId: 'caso_con_argentino_b' },
    },
  },
  caso_con_argentino_a: {
    question: 'Su madre...',
    options: {
      si: { label: 'se casó con un argentino', nextStepId: 'madre_naturalizo_a' },
      no: { label: 'no se casó con un argentino', result: 'CONSULTA' },
    },
  },
  caso_con_argentino_b: {
    question: 'Su madre...',
    options: {
      si: { label: 'se casó con un argentino', nextStepId: 'madre_naturalizo_a' },
      no: { label: 'no se casó con un argentino', nextStepId: 'caso_1975' },
    },
  },
  caso_1975: {
    question: 'Su madre se casó...',
    options: {
      si: { label: 'antes de 1975', result: 'OPCION' },
      no: { label: 'a partir de 1975', nextStepId: 'madre_naturalizo_a' },
    },
  },
  madre_naturalizo_a: {
    question: '¿Su madre se naturalizó argentina?',
    options: {
      si: { label: 'Sí', nextStepId: 'madre_adquirio_1978_a' },
      no: { label: 'No', nextStepId: 'ud_nacio_1978_a' },
    },
  },
  madre_adquirio_1978_a: {
    question:
      'Su madre adquirió la nacionalidad argentina...',
    options: {
      si: { label: 'antes del 29/12/1978', result: 'OPCION' },
      no: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1978_a' },
    },
  },
  ud_nacio_1978_a: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 29/12/1978', result: 'OPCION' },
      no: { label: 'a partir del 29/12/1978', result: 'NACIONALIDAD DE ORIGEN' },
    },
  },
  padre_reconocio: {
    question: '¿Ud. fue reconocido por su padre?',
    options: {
      si: { label: 'Sí', result: 'CONSULTA' },
      no: { label: 'No', nextStepId: 'madre_naturalizo_b' },
    },
  },
  madre_naturalizo_b: {
    question: '¿Su madre se naturalizó argentina?',
    options: {
      si: { label: 'Sí', nextStepId: 'adquirio_1978' },
      no: { label: 'No', nextStepId: 'ud_nacio_1960' },
    },
  },
  madre_era_espanola: {
    question: 'Su madre...',
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
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 29/12/1978', result: 'OPCION' },
      no: { label: 'a partir del 29/12/1978', nextStepId: 'ud_nacio_1985' },
    },
  },
  // ABUELOS //
  abuelo_naturalizo: {
    question: '¿Su abuelo/a adquirió la nacionalidad Argentina?',
    options: {
      si: { label: 'Sí', nextStepId: 'antes_de_1978' },
      no: { label: 'No', nextStepId: 'cual_abuelo' },
    },
  },
  antes_de_1978: {
    question: 'Su abuelo/a adquirió la nacionalidad Argentina...',
    options: {
      si: { label: 'antes del 29/12/1978', nextStepId: 'padre_madre_habia_nacido' },
      no: { label: 'a partir del 29/12/1978', nextStepId: 'cual_abuelo' },
    },
  },
  cual_abuelo: {
    question: 'Se trata de su...',
    options: {
      abuelo_paterno: {
        label: 'abuelo paterno',
        nextStepId: 'padre_nacio_arg_1960',
      },
      abuelo_materno: {
        label: 'abuelo materno',
        nextStepId: 'madre_nacio_arg_1960',
      },
      alguna_abuela: {
        label: 'alguna de sus abuelas',
        nextStepId: 'abuela_estaba_casada',
      },
    },
  },
  padre_nacio_arg_1960: {
    question: 'Su padre nació en Argentina...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'padre_nacio_1941' },
      no: { label: 'a partir del 29/12/1960', nextStepId: 'padre_inscribe' },
    },
  },
  padre_nacio_1941: {
    question: 'Su padre nació...',
    options: {
      si: { label: 'antes del 01/01/1941', nextStepId: 'ud_tiene_18_o_menos' },
      no: { label: 'a partir del 01/01/1941', nextStepId: 'padre_hizo_servicio_militar' },
    },
  },
  padre_hizo_servicio_militar: {
    question: '¿Su padre hizo el servicio militar argentino?',
    options: {
      si: { label: 'Sí', nextStepId: 'ud_tiene_18_o_menos_a' },
      no: { label: 'No', nextStepId: 'padre_inscribe' },
    },
  },
  ud_tiene_18_o_menos_a: {
    question: 'Ud. tiene hoy...',
    options: {
      si: { label: '18 años o menos', nextStepId: 'padre_recupera' },
      no: { label: '19 años o más', result: 'NO PUEDE' },
    },
  },
  padre_recupera: {
    question:
      'Su padre deberá recuperar la nacionalidad española mientras ud. sea aún menor de edad',
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
    question: 'Su madre nació en Argentina...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'ud_tiene_18_o_menos_b' },
      no: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1978' },
    },
  },
  ud_tiene_18_o_menos_b: {
    question: 'Ud. tiene hoy...',
    options: {
      si: { label: '18 años o menos', nextStepId: 'madre_recupera' },
      no: { label: '19 años o más', result: 'NO PUEDE' },
    },
  },
  ud_nacio_1978: {
    question: 'Ud. nació...',
    options: {
      si: { label: 'antes del 29/12/1978', nextStepId: 'madre_inscribe' },
      no: { label: 'a partir del 29/12/1978', result: 'NO PUEDE' },
    },
  },
  madre_recupera: {
    question:
      'Su madre deberá recuperar la nacionalidad española mientras ud. sea aún menor de edad',
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
    question: 'Su abuela...',
    options: {
      si: { label: 'estaba casada cuando nació su padre/madre', nextStepId: 'padre_madre_nacio_1978' },
      nunca: { label: 'nunca se casó', nextStepId: 'abuelo_reconocio' },
    },
  },
  padre_madre_nacio_1978: {
    question: 'Su padre/madre nació...',
    options: {
      si: { label: 'antes del 29/12/1978', nextStepId: 'ud_tiene_18_o_menos_c' },
      no: { label: 'a partir del 29/12/1978', nextStepId: 'abuela_caso_1954' },
    },
  },
  abuela_caso_1954: {
    question: 'Su abuela se casó...',
    options: {
      si: { label: 'antes de 1954', nextStepId: 'con_argentino' },
      no: { label: 'a partir de 1954', nextStepId: 'abuela_caso_1954' },
    },
  },
  ud_tiene_18_o_menos_c: {
    question: 'Ud. tiene hoy...',
    options: {
      si: { label: '17 años o menos', nextStepId: 'madre_adquiere_a' },
      no: { label: '18 años o más', result: 'NO PUEDE' },
    },
  },
  madre_adquiere_a: {
    question:
      'Su madre deberá adquirir la nacionalidad española mientras ud. sea aún menor de edad',
    options: {
      continuar: { label: 'Continuar', result: 'OPCION' },
    },
  },
  con_argentino: {
    question: 'Su abuela...',
    options: {
      si: { label: 'se casó con argentino', nextStepId: 'madre_adquiere_b' },
      no: { label: 'no se casó con argentino', result: 'CONSULTA' },
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
      si: { label: 'Sí', result: 'CONSULTA' },
      no: { label: 'No', nextStepId: 'padre_madre_nacio_1960' },
    },
  },
  padre_madre_nacio_1960: {
    question: 'Su padre/madre nació...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'padre_madre_nacio_1941' },
      no: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  padre_madre_nacio_1941: {
    question: 'Su padre/madre nació...',
    options: {
      si: { label: 'antes del 01/01/1941', nextStepId: 'ud_tiene_18_o_menos_c' },
      no: { label: 'a partir del 01/01/1941', nextStepId: 'es_su_padre' },
    },
  },
  es_su_padre: {
    question: 'Se trata de...',
    options: {
      no: { label: 'su madre', nextStepId: 'ud_tiene_18_o_menos_c' },
      si: { label: 'su padre', nextStepId: 'padre_hizo_servicio_militar' },
    },
  },
  padre_madre_habia_nacido: {
    question: '¿Su padre/madre ya había nacido?',
    options: {
      si: { label: 'Sí', nextStepId: 'padre_era_mayor' },
      no: { label: 'No', nextStepId: 'ud_era_mayor' },
    },
  },
  ud_era_mayor: {
    question:
      'Cuando su padre adquirió la nacionalidad española ud. era...',
    options: {
      no: { label: 'menor de edad', nextStepId: 'ud_tiene_19_o_menos' },
      si: { label: 'mayor de edad', result: 'NO PUEDE' },
    },
  },
  padre_era_mayor: {
    question:
      'Cuando su abuelo adquirió otra nacionalidad distinta de la española su padre era...',
    options: {
      no: { label: 'menor de edad', nextStepId: 'ud_era_mayor' },
      si: { label: 'mayor de edad', nextStepId: 'padre_nacio_1960_b' },
    },
  },
  padre_nacio_1960_b: {
    question: 'Su padre nació...',
    options: {
      si: { label: 'antes del 29/12/1960', nextStepId: 'padre_nacio_1941_b' },
      no: { label: 'a partir del 29/12/1960', nextStepId: 'ud_nacio_1985' },
    },
  },
  padre_nacio_1941_b: {
    question: 'Su padre nació...',
    options: {
      si: { label: 'antes del 01/01/1941', nextStepId: 'ud_era_mayor' },
      no: { label: 'a partir del 01/01/1941', nextStepId: 'padre_hizo_servicio_militar_b' },
    },
  },
  padre_hizo_servicio_militar_b: {
    question: '¿Su padre hizo el servicio militar argentino?',
    options: {
      si: { label: 'Sí', nextStepId: 'ud_era_mayor' },
      no: { label: 'No', nextStepId: 'ud_nacio_1985' },
    },
  },
};

export { DECISION_TREE, type Option, type Step };
