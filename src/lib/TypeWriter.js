import Typed from 'typed.js';

export default class TypeWriter{
    constructor(elId, msgArr){
        this.elId = elId;
        this.option = {
            strings: msgArr,
            typeSpeed: 0,
            showCursor: true,
            cursorChar: '|',
        };
    }

    init(){
        this.writer = new Typed(this.elId, this.option)
    }

    start(){
        this.writer.start
    }

    stop(){
        this.writer.stop()
    }
}