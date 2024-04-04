//normalize, faz a separação dos caracteres: "e´"
//replace, ele ta fazendo uma normalização: ele tira os acentos e coloca um caracte em branco. "e"
export function generateSlug(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') //remoção de simbolos
        .replace(/\s+/g, '-'); //quiando sobra mais de 1 espaço em branco ele coloca um ( - ) hifen
}
