let prop = require('../lib/index.js');

// noinspection JSUnresolvedVariable
const Properties = prop.Properties;

test('parse', () => {
    expect(Properties.parse(
        `
        hello:world
        `
    )).toStrictEqual({hello: 'world'});

    expect(Properties.parse(
        `
        hello:world
        hello1 :world1
        hello2: world2
        hello3 : world3
        hello4=world4
        hello5 = world5
        `
    )).toStrictEqual({
        hello: 'world',
        hello1: 'world1',
        hello2: 'world2',
        hello3: 'world3',
        hello4: 'world4',
        hello5: 'world5',
    });

    expect(Properties.parse(
        `
        num=1234
        boolTrue=true
        boolFalse=false
        str=string
        `
    )).toStrictEqual({
        num: 1234,
        boolTrue: true,
        boolFalse: false,
        str: "string"
    });

    expect(Properties.parse(
        `
        key = value with spaces
        `
    )).toStrictEqual({
        key: "value with spaces"
    });
});

test('stringify', () => {
    expect(
        Properties.stringify({hello: "world"})
    ).toBe(
        "hello=world\n"
    );

    expect(
        Properties.stringify({
            num: 1234,
            boolTrue: true,
            boolFalse: false,
            str: "string"
        })
    ).toBe(
        "num=1234\nboolTrue=true\nboolFalse=false\nstr=string\n"
    );

    expect(
        Properties.stringify({
            key: "value with spaces"
        })
    ).toBe(
        "key=value with spaces\n"
    );
});
