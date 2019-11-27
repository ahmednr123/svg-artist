export function makeid (length: number): string {
    var result          =   '';
    var characters      =   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var onlyCharacters  =   '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    result += onlyCharacters.charAt(Math.floor(Math.random() * onlyCharacters.length));

    for ( var i = 0; i < length-1; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}