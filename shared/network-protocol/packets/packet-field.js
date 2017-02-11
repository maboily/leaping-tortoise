class PacketField {
    /**
     * @returns {BinaryType}
     */
    get fieldType() {
        return this._fieldType;
    }

    /**
     * @param {BinaryType} value
     */
    set fieldType(value) {
        this._fieldType = value;
    }

    /**
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @param {String} value
     */
    set name(value) {
        this._name = value;
    }

    /***
     * @param {String} name
     * @param {BinaryType} fieldType
     */
    constructor(name, fieldType) {
        this._name = name;
        this._fieldType = fieldType;
    }
}

module.exports = PacketField;