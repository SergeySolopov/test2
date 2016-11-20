export default function parse(url) {
    let reg = new RegExp('([a-zA-Z0-9_\.]+)$', 'g');
    let arPart = url.split('?');
    return arPart[0].match(reg);
}
