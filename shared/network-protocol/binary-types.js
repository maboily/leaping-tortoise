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
}

class BinaryUInt64 extends BinaryType {
    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.readUIntLE(offset, 4);
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.writeUIntLE(value, offset, 4);
    }
}

class BinaryFixedString extends BinaryType {
    constructor(length) {
        this.length = length;
    }

    /***
     * @param {Buffer} buffer
     * @param {Number} offset
     */
    readFromBuffer(buffer, offset) {
        return buffer.toString("ASCII", offset, this.length);
    }

    /***
     * @param {Buffer} buffer
     * @param {String} value
     * @param {Number} offset
     */
    writeToBuffer(buffer, value, offset) {
        return buffer.write(value, offset, this.length, "ASCII");
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
