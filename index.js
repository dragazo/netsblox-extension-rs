(function () {    
    class ExampleExtension extends Extension {
        constructor(ide) {
            super('ExampleExtension');
        }

        onOpenRole() {

        }

        getSettings() {
            return [

            ];
        }

        getMenu() {
            return {

            };
        }

        getCategories() {
            return [
				new Extension.Category('helloworld', new Color(195, 0, 204)),

            ];
        }

        getPalette() {
            return [
				new Extension.PaletteCategory(
					'helloworld',
					[
						new Extension.Palette.Block('logHelloName'),
						new Extension.Palette.Block('logHelloWorld'),
					],
					SpriteMorph
				),
				new Extension.PaletteCategory(
					'helloworld',
					[
						new Extension.Palette.Block('logHelloName'),
						new Extension.Palette.Block('logHelloWorld'),
					],
					StageMorph
				),

            ];
        }

        getBlocks() {
            return [
				new Extension.Block(
					'logHelloName',
					'command',
					'helloworld',
					'Log Hello %name',
					[],
					function (name) { ExampleExtension_fns.hello_name(name) }
				).for(SpriteMorph, StageMorph),
				new Extension.Block(
					'logHelloWorld',
					'command',
					'helloworld',
					'Log Hello World!',
					[],
					function () { ExampleExtension_fns.hello_world() }
				).for(SpriteMorph, StageMorph),

            ];
        }

        getLabelParts() {
            return [
				new Extension.LabelPart(
					'%name',
					() => {
						const part = new InputSlotMorph(
							null, // text
							false, // non-numeric
							null,
							false
						);
						return part;
					}
				),

            ];
        }

    }

    NetsBloxExtensions.register(ExampleExtension);
    let path = document.currentScript.src;
    path = path.substring(0, path.lastIndexOf("/"));
    var s = document.createElement('script');
    s.type = "module";
    s.innerHTML = `import init, {hello_world, hello_name} from '${path}/pkg/netsblox_extension_rs.js';
    
    
        await init();

        window.ExampleExtension_fns = {};
		window.ExampleExtension_fns.hello_world = hello_world;
		window.ExampleExtension_fns.hello_name = hello_name;
        `;
    document.body.appendChild(s);
})();