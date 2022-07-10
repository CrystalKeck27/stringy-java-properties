type Property = string | number | boolean | null

const Properties = {
    parse(text: string): { [key: string]: Property } {
        let lines = text.split('\n');
        const output: { [key: string]: Property } = {};
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed[0] == '!' || trimmed[0] == '#' || trimmed.length == 0) continue;
            const result = trimmed.match(/^(.*?)\s*(?<!\\)[=:]\s*(.*)$/);
            if (result == null) {
                output[trimmed] = null;
                continue;
            }
            const ifNum = parseInt(result[2]);
            if (!isNaN(ifNum)) {
                output[result[1]] = ifNum;
                continue;
            }
            if (result[2] == "true") {
                output[result[1]] = true;
                continue;
            }
            if (result[2] == "false") {
                output[result[1]] = false;
                continue;
            }
            output[result[1]] = result[2];
        }
        return output;
    },

    stringify(value: { [key: string]: Property }): string {
        let output = '';
        for (const key in value) {
            const val = value[key];
            if (val == null) {
                output = key + '\n';
                continue;
            }
            output += `${key}=${val}\n`;
        }
        return output;
    }
};

export {Properties};
