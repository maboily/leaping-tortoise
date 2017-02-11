function pad(pad, str, padLeft) {
    if (typeof str === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

class BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        throw "readFromBuffer Not implemented.";
    }

    /***
     * @param {Buffer} buffer
     * @param value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        throw "writeToBuffer Not implemented.";
    }

    /**
     * @return {Number}
     */
    getByteSize() {
        throw "getByteSize Not implemented.";
    }
}

class BinaryByte extends BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.readUInt8(offset);
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.writeUInt8(value, offset);
    }

    /**
     * @returns {Number}
     */
    getByteSize() {
        return 1;
    }
}

class BinaryUInt16 extends BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.readUInt16LE(offset);
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.writeUInt16LE(value, offset);
    }

    /**
     * @returns {Number}
     */
    getByteSize() {
        return 2;
    }
}

class BinaryUInt32 extends BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.readUInt32LE(offset);
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.writeUInt32LE(value, offset);
    }

    /**
     * @returns {Number}
     */
    getByteSize() {
        return 4;
    }
}

class BinaryUInt64 extends BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.readUIntLE(offset, 8);
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.writeUIntLE(value, offset, 8);
    }

    /**
     * @returns {Number}
     */
    getByteSize() {
        return 8;
    }
}

class BinaryFixedString extends BinaryType {
    static trimTerminatingNullBytes(string) {
        return string.replace(/[\u0000]+$/, '');
    }

    constructor(length) {
        super();

        this._length = length;
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return BinaryFixedString.trimTerminatingNullBytes(buffer.toString("ascii", offset, this._length));
    }

    /***
     * @param {Buffer} buffer
     * @param {String} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.write(value, offset, this._length, "ascii");
    }

    /**
     * @returns {Number}
     */
    getByteSize() {
        return this._length;
    }
}

module.exports = {
    BinaryType: BinaryType,
    BinaryByte: BinaryByte,
    BinaryUInt16: BinaryUInt16,
    BinaryUInt32: BinaryUInt32,
    BinaryUInt64: BinaryUInt64,
    BinaryFixedString: BinaryFixedString
};
