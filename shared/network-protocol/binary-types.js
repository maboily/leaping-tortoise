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
    getByteSize(value) {
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
     * @param {Number} value
     * @returns {Number}
     */
    getByteSize(value) {
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
     * @param {Number} value
     * @returns {Number}
     */
    getByteSize(value) {
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
     * @param {Number} value
     * @returns {Number}
     */
    getByteSize(value) {
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
     * @param {Number} value
     * @returns {Number}
     */
    getByteSize(value) {
        return 8;
    }
}

class BinaryFixedString extends BinaryType {
    constructor(length) {
        this._length = length;
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.toString("ASCII", offset, this._length);
    }

    /***
     * @param {Buffer} buffer
     * @param {String} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.write(value, offset, this._length, "ASCII");
    }

    /**
     * @param {String} value
     * @returns {Number}
     */
    getByteSize(value) {
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
