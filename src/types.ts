export type ResultKey = 
  | 'NACIONALIDAD_ORIGEN'
  | 'NACIONALIDAD_ORIGEN_LMD'
  | 'NO_PUEDE'
  | 'NO_PUEDE_NAT_PREVIA'
  | 'NO_PUEDE_LEJANO'
  | 'OPCION'
  | 'RECUPERA'
  | 'DISPENSA'
  | 'CONSULTA';

export const RESULT_LABELS: Record<ResultKey, string> = {
  'NACIONALIDAD_ORIGEN': 'NACIONALIDAD DE ORIGEN',
  'NACIONALIDAD_ORIGEN_LMD': 'NACIONALIDAD DE ORIGEN (Ley Memoria Democrática)',
  'NO_PUEDE': 'NO PUEDE OBTENER LA NACIONALIDAD ESPAÑOLA',
  'NO_PUEDE_NAT_PREVIA': 'NO PUEDE OBTENER LA NACIONALIDAD ESPAÑOLA (Por naturalización previa)',
  'NO_PUEDE_LEJANO': 'NO PUEDE OBTENER LA NACIONALIDAD ESPAÑOLA (Grado de parentesco muy lejano)',
  'OPCION': 'NACIONALIDAD POR OPCIÓN (Art. 20 C.c)',
  'RECUPERA': 'DEBE RECUPERAR (Art. 26 C.c)',
  'DISPENSA': 'DISPENSA',
  'CONSULTA': 'CONSULTAR CASO PARTICULAR'
}

export interface Option {
  label: string;
  nextStepId?: string | null;
  result?: ResultKey;
}

export interface Step {
  question: string;
  options: Record<string, Option>;
}

export interface HistoryItem {
  stepId: string;
  question: string;
  label: string;
}