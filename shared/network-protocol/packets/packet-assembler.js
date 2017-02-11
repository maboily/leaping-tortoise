class PacketAssembler {
    /**
     * @param {Buffer} buffer
     */
    deserializeFromBuffer(packetType, buffer) {
        let assembledPacket = new packetType();
        let offset = 0;

        for (const field of packetType.BaseStructure) {
            const fieldValue = field.fieldType.readFromBuffer(buffer, offset);
            offset += field.fieldType.getByteSize(fieldValue);
            assembledPacket[field.name] = fieldValue;
        }

        return assembledPacket;
    }

    /**
     * @param {LengthTypedPacket} packet
     */
    serializeToBuffer(packet) {
        let buffer = Buffer.alloc(packet.length);
        let offset = 0;

        for (const field of packet.constructor.BaseStructure) {
            const fieldValue = packet[field.name];
            field.fieldType.writeToBuffer(buffer, fieldValue, offset);
            offset += field.fieldType.getByteSize();
        }

        return buffer;
    }

    /**
     * @param {LengthTypedPacket} packet
     */
    correctLength(packet) {
        let actualLength = 0;

        for (const field of packet.constructor.BaseStructure) {
            actualLength += field.fieldType.getByteSize();
        }

        packet.length = actualLength;
    }
}

module.exports = PacketAssembler;