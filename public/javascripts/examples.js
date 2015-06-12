var CubeFlat = require('./cubes/cubeFlat');
var Cube3D = require('./cubes/cubeChromeFF');
var AdaptiveCube = require('./cubeBrowserWrap');

var Video = require('./faces/cube_faces_content/videoManager');
var StaticImage = require('./faces/cube_faces_content/staticImageManager');

var cubeFacesNames = ['front', 'back', 'left', 'right', 'top', 'bottom'];

var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

var addSimpleRoataionBluePrint = function (cube) {
    cube.interaction.addAutorotateBlueprint(
        {
            blueprint: [['left', 4, 2500], 2, ['up', 4, 2500], 2, ['right', 4, 2500]],
            options: {repeat: true, repeatInterval: 1}
        });
};

var addSimpleFaceDecorations = function (cube, exclude) {
    exclude = exclude || [];
    var colors = ['7BE0AD', '816E94', '8D94BA', 'DCC7BE', '093AC1', 'C05746'];
    cubeFacesNames.forEach(function (faceName, index) {
        var pass = exclude.some(function (fname) {
            return fname === faceName
        });
        if (!pass) {
            var size;
            if (faceName === 'top' || faceName === 'bottom') {
                size = cube.width + 'x' + (cube.length || cube.height)
            }
            else if (faceName === 'left' || faceName === 'right') {
                size = cube.height + 'x' + (cube.length || cube.height)

            }
            else {
                size = cube.width + 'x' + cube.height
            }
            var imgUrl = 'http://dummyimage.com/' + size + '/' + colors[index] + '/ffe&text=' + faceName.slice(0, 1).toUpperCase() + faceName.slice(1);

            var img = new StaticImage({url: imgUrl});
            cube[faceName].addContent(img)
        }
    })

};


var appendCubes = function (cubes, parentDiv) {
    cubes.forEach(function (cube) {
        var cubeShowcaseEl = document.createElement('div');
        var title = document.createElement('h3');
        var body = document.createElement('div');
        title.innerText = cube[1].length > 0 ? '#' + cube[1] : '';
        body.innerHTML = marked(cube[2]);
        body.className = 'cube-container-text-body';
        cubeShowcaseEl.appendChild(title);
        cubeShowcaseEl.appendChild(cube[0].cube);
        cubeShowcaseEl.appendChild(body);

        parentDiv.appendChild(cubeShowcaseEl)
    })

};
var removeCubes = function (parentDiv) {
    this.cubes.forEach(function (cube) {
        if (cube[0].hasOwnProperty('perspectiveWrap')) {
            cube[0].perspectiveWrap.remove()
        }
        else {
            cube[0].shape.remove()
        }
        cube[0].interaction.locked = true;
    });
    while (parentDiv.hasChildNodes()) {
        parentDiv.removeChild(parentDiv.lastChild);
    }
};

module.exports = {
    'welcome': {
        id: 1,
        title: 'What to expect',
        menuTitle: 'Welcome',
        explanation: 'There you will find a short documentation and showcasing of my *Cube* creation. \n\n ***Have fun!***',
        bottomText: '',
        initialize: function (parentDiv) {
            var Cube300x300x300 = new Cube3D(300, 300, 300);
            // TODO add adforms faces
            addSimpleFaceDecorations(Cube300x300x300);
            var autorotateOptions = {
                blueprint: [['up', 3, 2000], 1, ['right', 5, 1500], 2, ['left', 8, 2500]],
                options: {repeat: true, repeatInterval: 10}
            };
            Cube300x300x300.interaction.addAutorotateBlueprint(autorotateOptions);
            Cube300x300x300.setPerspectiveTo(3000);
            Cube300x300x300.interaction.addPauseOnUserInactivity();

            this.cubes = [[Cube300x300x300, "", ""]];

            appendCubes(this.cubes, parentDiv)


        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    },

    basic: {
        id: 2,
        title: 'They come in various sizes!',
        menuTitle: 'Basics (Cube3D)',
        explanation: "You can specify cubes dimensions height, width, length and this create them of any size.\n``` \n\n// create cube by calling constructor\nvar Cube = new Cube3D(height, width, length);\n\n```\n\n// append created cube to any DOM element\n```\nvar container = document.getElementById('cube-container');\ncontainer.appendChild(Cube.cube);\n```\n\n\n\n",
        bottomText: ""
        ,
        initialize: function (parentDiv) {
            var Cube200x200x200 = new Cube3D(200, 200, 200);
            var Cube200x600x200 = new Cube3D(200, 600, 200);
            var Cube200x200x400 = new Cube3D(200, 200, 400);

            //TODO flat cube
            Cube200x200x200.setPerspectiveTo(3000);
            Cube200x600x200.setPerspectiveTo(3000);
            Cube200x200x400.setPerspectiveTo(3000);

            addSimpleRoataionBluePrint(Cube200x200x200);
            addSimpleRoataionBluePrint(Cube200x600x200);
            addSimpleRoataionBluePrint(Cube200x200x400);
            addSimpleFaceDecorations(Cube200x200x200);
            addSimpleFaceDecorations(Cube200x600x200);
            addSimpleFaceDecorations(Cube200x200x400);

            this.cubes = [[Cube200x200x200, "200 x 200 x 200 cube", "``` \nvar Cube200x200x200 = new Cube3D(200, 200, 200);\n\n// after cube has been created you can modify it's perspective (lower perspective means cube is more distorted from it's original, specified size)\nCube200x200x200.setPerspectiveTo(3000);\n\n```\n"],
                [Cube200x600x200, "200 x 600 x 200 cube", "``` \nvar Cube200x600x200 = new Cube3D(200, 600, 200);\n\nCube200x600x200.setPerspectiveTo(3000);\n\n```\n"],
                [Cube200x200x400, "200 x 200 x 400", "``` \nvar Cube200x200x400 = new Cube3D(200, 200, 400);\n\nCube200x200x400.setPerspectiveTo(1000);\n\n```\n"]];
            appendCubes(this.cubes, parentDiv)

        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    },
    'userInteraction': {
        id: 3,
        title: 'Cubes rotations',
        menuTitle: 'Cube rotations (Cube3D.interaction)',
        explanation: "Cube can rotate on it's own or it can be rotated by user. **Both can't happen at the same time (cube is locked auto-rotation mode).**\n\nUser can rotate cube by:\n* swiping on a touch screen device;\n* using mouse middle wheel;\n\nCube can interact with user by:\n* auto-rotating in a specified way, starting/stopping any behavior when user is not active on a window (tab);\n* auto-playing content provided in cubes faces (read more at Adding content);",
        bottomText: "",
        initialize: function (parentDiv) {
            var Cube300x300x300_leftRight = new Cube3D(300, 300, 300);
            var Cube300x300x300_upDown = new Cube3D(300, 300, 300);
            var Cube300x300x300_autoRotate = new Cube3D(300, 300, 300);

            Cube300x300x300_leftRight.interaction.addMiddleScrollRotate('leftRight');
            Cube300x300x300_leftRight.interaction.addSwipeRotate();
            Cube300x300x300_upDown.interaction.addMiddleScrollRotate('upDown');
            Cube300x300x300_upDown.interaction.addSwipeRotate();

            var autorotateOptions = {
                blueprint: [['up', 3, 2000], 1, ['right', 5, 1500]],
                options: {repeat: true, repeatInterval: 10}
            };
            Cube300x300x300_autoRotate.interaction.addAutorotateBlueprint(autorotateOptions);
            Cube300x300x300_autoRotate.interaction.addMiddleScrollRotate('leftRight');


            addSimpleFaceDecorations(Cube300x300x300_leftRight);
            addSimpleFaceDecorations(Cube300x300x300_upDown);
            addSimpleFaceDecorations(Cube300x300x300_autoRotate);
            Cube300x300x300_leftRight.setPerspectiveTo(3000);
            Cube300x300x300_upDown.setPerspectiveTo(3000);
            Cube300x300x300_autoRotate.setPerspectiveTo(3000);


            this.cubes = [[Cube300x300x300_leftRight, 'Will rotate left/right on mouse wheel', "``` \nvar Cube300x300x300_leftRight = new Cube3D(300, 300, 300);\n\nCube300x300x300_leftRight.interaction.addMiddleScrollRotate('leftRight');\nCube300x300x300_leftRight.interaction.addSwipeRotate();\n\n```\n"],
                [Cube300x300x300_upDown, 'Will rotate up/down on mouse wheel', "``` \nvar Cube300x300x300_upDown = new Cube3D(300, 300, 300);\n\nCube300x300x300_upDown.interaction.addMiddleScrollRotate('upDown');\nCube300x300x300_upDown.interaction.addSwipeRotate();\n\n```\n"],
                [Cube300x300x300_autoRotate, 'Will auto-rotate by specified blueprint, you can not interact with it, while it is in auto mode, but you can after it is finished', "``` \nvar Cube300x300x300_autoRotate = new Cube3D(300, 300, 300);\n\nvar autorotateOptions = {\n    blueprint: [['up', 3, 2000], 1, ['right', 5, 1500]],\n    options: {repeat: true, repeatInterval: 10}\n};\n\nCube300x300x300_autoRotate.interaction.addAutorotateBlueprint(autorotateOptions);\nCube300x300x300_autoRotate.interaction.addMiddleScrollRotate('leftRight');\n\n```\n"]];

            appendCubes(this.cubes, parentDiv);

        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    },
    'addingContent (images)': {
        id: 4,
        title: 'Adding advertisement content to the cube is easy',
        menuTitle: 'Adding image content (Cube3D[face].addContent)',
        explanation: 'Every cube has 6 faces: front, back, left, right, top, bottom. You ' +
        'can customize each of these faces by adding and imange or a video.\n\n ' +
        '#### Adding and image \n\n' +
        'You can specify and image **url** and **what happens** when user:\n\n * scrolls on an image [optional]\n\n * click on an image [optional]\n\n\n\n or when: \n\n*  face with an image comes on front (in auto-rotation mode or when user rotates cube itself)',
        bottomText: "`var Cube200x200x200 = new Cube3D(200, 200, 200);`\n\n#### Simply add an image by calling StaticImage constructor\n```\nnew StaticImage({\n    url: 'url to an image',\n    onclickDo: 'function to be executed on click [optional]'\n});\n\nvar img1 = new StaticImage({\n    url: 'http://dummyimage.com/200x200/7BE0AD/ffe'\n});\n\n\nCube200x200x200['front'].addContent(img1);\n```\n\n#### Add an image which takes us to specified website when clicked on\n```\nvar goTo = function (url, newTab) {\n    if (newTab) {\n        window.open(url, '_blank')\n    }\n    else {\n        window.open(url)\n    }\n};\n\n// any function passed to onclickDo will be executed when image is clicked on\nvar img2 = new StaticImage({\n    url: 'http://dummyimage.com/200x200/7BE0AD/ffe',\n    onclickDo: goTo.bind(null, 'http://site.adform.com/', true)\n});\n\nCube200x200x200['back'].addContent(img2);\n```\n\n\n#### User hover over an image can also execute the function in same way\n```\nvar img3 = new StaticImage({\n    url: 'http://dummyimage.com/200x200/7BE0AD/ffe',\n    onmouseoverDo: goTo.bind(null, 'http://site.adform.com/', true)\n});\n\n\nCube200x200x200['top'].addContent(img3);\n```\n\n\n"
        ,
        initialize: function (parentDiv) {
            var Cube200x200x200 = new Cube3D(200, 200, 200);

            // Simply add an image
            var img1 = new StaticImage({
                url: 'http://dummyimage.com/200x200/7BE0AD/ffe&text=Front(link)'
            });

            Cube200x200x200['front'].addContent(img1);

            // Add an image which takes us to specified website when clicked on
            var goTo = function (url, newTab) {
                if (newTab) {
                    window.open(url, '_blank')
                }
                else {
                    window.open(url)

                }
            };

            var img2 = new StaticImage({
                url: 'http://dummyimage.com/200x200/7BE0AD/ffe&text=Back(link)',
                onclickDo: goTo.bind(null, 'http://site.adform.com/', true)
            });

            Cube200x200x200['back'].addContent(img2);


            // any function passed to **onclickDo** will be executed when image is clicked on

            // User hover over an image can also execute the function in same way

            var img3 = new StaticImage({
                url: 'http://dummyimage.com/200x200/7BE0AD/ffe&text=Top(link)',
                onmouseoverDo: goTo.bind(null, 'http://site.adform.com/', true)
            });


            Cube200x200x200['top'].addContent(img3);


            addSimpleFaceDecorations(Cube200x200x200, ['top', 'front', 'back']);
            addSimpleRoataionBluePrint(Cube200x200x200);
            Cube200x200x200.setPerspectiveTo(3000);


            this.cubes = [[Cube200x200x200, '', '']];
            appendCubes(this.cubes, parentDiv)

        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    },
    'addingContent (videos)': {
        id: 5,
        title: 'Adding advertisement content to the cube is easy',
        menuTitle: 'Adding video content (Cube3D[face].addContent)',
        explanation: 'Every cube has 6 faces: front, back, left, right, top, bottom. You ' +
        'can customize each of these faces by adding and image or a video.\n\n ' +
        '#### Adding a video \n\n' +
        'You can specify video **url** (local, not external i.e YouTube) and **what happens** when user:\n\n * scrolls on a video [optional]\n\n * click on a video [optional]\n\n\n\n or when: \n\n*  face with the video comes on front (in auto-rotation mode or when user rotates cube itself)',
        bottomText: "```\nvar Cube260x462x400= new Cube3D(260, 462, 400);\n\n// Create a video which autoplays when is on front (facing user)\nvar vid1 = new Video({\n    url: '/video/big_buck_bunny.webm',\n    controls: false,\n    onclickDo: 'playStop',\n    autoplay: true\n});\n\nCube260x462x400['right'].addContent(vid1);\n\n// Create a video which doesn't autoplay\nvar vid2 = new Video({\n    url: '/video/big_buck_bunny.webm',\n    onclickDo: 'playStop',\n    autoplay: false\n});\n\nCube260x462x400['front'].addContent(vid2);\n```\n\n\n",
        initialize: function (parentDiv) {
            var Cube260x462x400 = new Cube3D(260, 462, 400);

            // Create a video which autoplays when is on front (facing user)
            var vid1 = new Video({
                url: '/video/big-buck-bunny_trailer.webm',
                controls: false,
                onclickDo: 'playStop',
                autoplay: true
            });

            // Create a video which doesn't autoplay
            var vid2 = new Video({
                url: 'video/big-buck-bunny_trailer.webm',
                onclickDo: 'playStop',
                autoplay: false
            });


            Cube260x462x400['back'].addContent(vid1);
            Cube260x462x400['front'].addContent(vid2);


            addSimpleFaceDecorations(Cube260x462x400, ['front', 'back']);
            Cube260x462x400.interaction.addAutorotateBlueprint({
                blueprint: [['left', 4, 10000]],
                options: {repeat: true}
            });
            Cube260x462x400.setPerspectiveTo(3000);


            this.cubes = [[Cube260x462x400, '', '']];
            appendCubes(this.cubes, parentDiv)

        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    },
    'flatCube': {
        id: 6,
        title: 'Pseudo 3D cube',
        menuTitle: 'Flat Cube',
        explanation: "CubeFlat(height, width) implement a **pseudo** 3D cube (because it's square/rectangle that has 6 faces, which rotate in a same way as cube). It has **mostly the same api** as Cube3D, but it doesn't use any of CSS3 transformations, so it can be displayed in browsers that have no support for CSS3 transformations.",
        bottomText: '',
        initialize: function (parentDiv) {
            //Initialized only with width and height, 3rd value would be ignored
            var Cube300x300_leftRight = new CubeFlat(300, 300);
            Cube300x300_leftRight.interaction.addMiddleScrollRotate('leftRight');
            Cube300x300_leftRight.interaction.addSwipeRotate();
            var Cube300x300_upDown = new CubeFlat(300, 300);
            Cube300x300_upDown.interaction.addMiddleScrollRotate('upDown');
            Cube300x300_upDown.interaction.addSwipeRotate();
            var Cube300x300_autoRotate = new CubeFlat(300, 300);
            Cube300x300_autoRotate.interaction.addMiddleScrollRotate('leftRight');
            Cube300x300_autoRotate.interaction.addAutorotateBlueprint({
                blueprint: [['left', 4, 2500], 1, ['down', 3, 2000], ['right', 6, 1500]],
                options: {repeat: true, repeatInterval: 20}
            });
            Cube300x300_autoRotate.interaction.addSwipeRotate();
            // Create a video which autoplays when is on front (facing user)
            var vid1 = new Video({
                url: '/video/big-buck-bunny_trailer.webm',
                controls: false,
                onclickDo: 'playStop',
                autoplay: true
            });
            Cube300x300_autoRotate['right'].addContent(vid1);


            addSimpleFaceDecorations(Cube300x300_leftRight, []);
            addSimpleFaceDecorations(Cube300x300_upDown, []);
            addSimpleFaceDecorations(Cube300x300_autoRotate, ['right']);


            this.cubes = [[Cube300x300_leftRight, 'Will "rotate" left/right on wheel scroll (any direction on swipe)', "```\nvar Cube300x300_leftRight = new CubeFlat(300, 300);\n\nCube300x300_leftRight.interaction.addMiddleScrollRotate('leftRight');\nCube300x300_leftRight.interaction.addSwipeRotate();\n```\n"],
                [Cube300x300_upDown, 'Will "rotate" up/down on wheel scroll (any direction on swipe)', "```\nvar Cube300x300_upDown = new CubeFlat(300, 300);\n\nCube300x300_upDown.interaction.addMiddleScrollRotate('upDown');\nCube300x300_upDown.interaction.addSwipeRotate();\n```\n"],
                [Cube300x300_autoRotate, 'Will auto-rotate for a while (any direction on swipe)', "```\nvar Cube300x300_autoRotate = new CubeFlat(300, 300);\n\nCube300x300_autoRotate.interaction.addMiddleScrollRotate('leftRight');\nCube300x300_autoRotate.interaction.addSwipeRotate();\n\nCube300x300_autoRotate.interaction.addAutorotateBlueprint({\n    blueprint: [['left', 4, 2500], 1, ['down', 3, 2000], ['right', 6, 1500]],\n    options: {repeat: true, repeatInterval: 20}\n});\n\n// Create a video which autoplays when is on front (facing user)\nvar vid1 = new Video({\n    url: '/video/big-buck-bunny_trailer.webm',\n    controls: false,\n    onclickDo: 'playStop',\n    autoplay: true\n});\n\nCube300x300_autoRotate['right'].addContent(vid1);\n```"]];
            appendCubes(this.cubes, parentDiv)

        },
        cubes: [],
        exit: function (parentDiv) {
            removeCubes.call(this, parentDiv)
        }
    }
};