			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

		//	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var geometry = new THREE.Geometry();

			geometry.vertices.push(
				new THREE.Vector3( -0.5, 0, -0.5 ),
				new THREE.Vector3( 0.5, 0, -0.5 ),
				new THREE.Vector3(  0.5, 0, 0.5 ),

				new THREE.Vector3( -0.5, 0, -0.5 ),
				new THREE.Vector3( -0.5, 0, 0.5 ),
				new THREE.Vector3(  0.5, 0, 0.5 )
			);
			geometry.verticesNeedUpdate = true;
			geometry.faces.push( new THREE.Face3( 0, 2, 1) );
			geometry.faces.push( new THREE.Face3( 3, 4, 5) );
			geometry.computeBoundingSphere();
			var cylinder = new THREE.CylinderGeometry( 0.5, 0.6, 1, 32 );
			var yellow = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var darkGreen = new THREE.MeshBasicMaterial( { color: 0x606f5b } );
			var darkBrown = new THREE.MeshBasicMaterial( { color: 0x2e1d1d } );
			var gray = new THREE.MeshBasicMaterial( { color: 0x666666 } );
			var border = new THREE.MeshBasicMaterial( { color: 0x262626 } );

			//position tester
			//var mesh = new THREE.Mesh( geometry, yellow );
			//mesh.position.set(2, 0 , 11);
		//	scene.add( mesh );
			var maplength = 50; //for across the screen
			var mapwidth = 30; // for back and forth I know its kinda backwords but whatever for now
			//Treasure generation
			var Obstacle1 = new THREE.BoxGeometry( 1, 1, 1 );
			var MiningObj = new THREE.SphereGeometry( 1, 6, 6 );
			var cube = new THREE.Mesh( MiningObj, yellow );
			cube.position.set(	Math.floor((Math.random() * maplength) + 1) -1,0.5,	Math.floor((Math.random() * mapwidth) + 1)-1);
			if(cube.position.x == 0){
				cube.position.x++;
			}
			if(cube.position.z == 0){
				cube.position.z++;
			}
			if(cube.position.x == maplength - 1){
				cube.position.x--;
			}
			if(cube.position.z == mapwidth - 1){
				cube.position.z--;
			}
			scene.add(cube);






			//Obstacles generation

			for (var J = 0; J < 12; J++) {
								var obstacle = new THREE.Mesh( Obstacle1, gray );
									obstacle.position.set(	Math.floor((Math.random() * maplength) + 1) -1,0.5,	Math.floor((Math.random() * mapwidth) + 1)-1);
								if ( obstacle.position.z == cube.position.z &&  obstacle.position.x == cube.position.x ){
									obstacle.position.z++;
								}
								if(obstacle.position.x == 0){
									obstacle.position.x++;
								}
								if(obstacle.position.z == 0){
									obstacle.position.z++;
								}
								if(obstacle.position.x == maplength - 1){
									obstacle.position.x--;
								}
								if(obstacle.position.z == mapwidth - 1){
									obstacle.position.z--;
								}
								scene.add( obstacle );
						}
			//MainMapTiles
			for (var x = 0; x < maplength; x++) {
							for (z = 0; z < mapwidth; z++) {
									var cube1 = new THREE.Mesh( geometry, green );
											cube1.position.set(x ,0,z);
											scene.add( cube1 );

					}
			}
			for (var x = 0; x < maplength; x++) {
							for (z = 0; z < mapwidth; z++) {
									var cube1 = new THREE.Mesh( Obstacle1, border );
									if(x == 0 || z == 0 || x == maplength - 1 || z == mapwidth - 1){
											scene.add( cube1 );
											cube1.position.set(x,0,z);
										}
					}
			}

			var outsideThresh = -20;//needs to be negative
			//Outside of map with tree generation
			for (var x = outsideThresh; x < maplength - outsideThresh; x++) {
							for (z = outsideThresh; z < mapwidth - outsideThresh; z++) {
									var cube1 = new THREE.Mesh( geometry, darkGreen );
									if(x <= 0 || z <= 0 || x >= maplength - 1 || z >= mapwidth - 1){
											scene.add( cube1 );
											cube1.position.set(x,0,z);
											var sceneryObjectChance = Math.floor((Math.random() * 40)+1);
											if (sceneryObjectChance == 9 && x <= -1 || sceneryObjectChance == 9 && z <= -1 || sceneryObjectChance == 9 && x >= maplength + 1 ||sceneryObjectChance == 9 && z >= mapwidth + 1){
											var trunk = new THREE.Mesh( cylinder, darkBrown );
											trunk.position.set(x,0.5,	z);
											var treeTop = new THREE.Mesh( MiningObj, green );
											treeTop.position.set(x,1.5,	z);
											scene.add(trunk);
											scene.add(treeTop);
										}
										}
					}
			}

			camera.position.z = 40;
			camera.position.y = 20;
			camera.position.x = maplength/2;
			camera.rotation.x = -45;
			var render = function () {
				requestAnimationFrame( render );

			//	mesh.rotation.x += 0.1;
				//mesh.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			render();
