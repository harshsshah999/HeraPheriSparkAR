/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

 import { debug } from 'console';
 import ReactiveModule, { and, vector } from 'Reactive';
 import { destroy } from 'Scene';
 
 //==============================================================================
 // Welcome to scripting in Spark AR Studio! Helpful links:
 //
 // Scripting Basics - https://fb.me/spark-scripting-basics
 // Reactive Programming - https://fb.me/spark-reactive-programming
 // Scripting Object Reference - https://fb.me/spark-scripting-reference
 // Changelogs - https://fb.me/spark-changelog
 //
 // For projects created with v87 onwards, JavaScript is always executed in strict mode.
 //==============================================================================
 
 // How to load in modules
 const Scene = require('Scene');
 const blocks= require('Blocks');
 const tapp= require('TouchGestures');
 const Patches= require('Patches');
 const Reactive = require('Reactive');
 const Time = require('Time');
 const Materials = require('Materials');
 const Textures = require('Textures');
 const timeInMilliseconds = 500;
 var currentGamlaCount=0;
 var khopdiAud =0
 var ChakkarAud =0;
 // Use export keyword to make a symbol available in scripting debug console
 export const Diagnostics = require('Diagnostics');
 
 // To use variables and functions across files, use export/import keyword
 // export const animationDuration = 10;
 
 // Use import keyword to import a symbol from another file
 // import { animationDuration } from './script.js'
 
 function checkCollision(positionA, positionB, lengthA, lengthB) {
     return Reactive.abs(positionA.sub(positionB)).le(Reactive.add(lengthA.div(2), lengthB.div(2)));
 }
  
 function checkCollision3D(objectA, objectB, sizeA, sizeB) {
     return Reactive.andList([
         checkCollision(objectA.transform.x, objectB.transform.x, sizeA.x, sizeB.x),
         checkCollision(objectA.transform.y, objectB.transform.y, sizeA.y, sizeB.y),
         checkCollision(objectA.transform.z, objectB.transform.z, sizeA.z, sizeB.z),
     ]);
 }
 

async function revertBaburao(){
    const [material,texture] = await Promise.all([
        Materials.findFirst('Baburao'),
        Textures.findFirst('1'),
       
      ]);
      material.diffuse=texture;
      //Patches.inputs.setBoolean('PlayKhopdi',false);
}

async function revertRaju(){
    const [material,texture] = await Promise.all([
        Materials.findFirst('Raju'),
        Textures.findFirst('3'),
       
      ]);
      material.diffuse=texture;
      //Patches.inputs.setBoolean('PlayChakkar',false);
}

async function checkColVal(blocknotcube,baburaoMat,baburaoTex2,baburaoTex1){
    var x=0;
        Scene.root.findFirst(blocknotcube.name).then(function(myBlock){
            
                
            // Get a scalar output
            myBlock.outputs.getScalar('CollisionInt')
            .then(function(blockOutputScalarSignal){
                Diagnostics.log("Tripaolski3");
                //Diagnostics.watch("coll",blockOutputScalarSignal );
                blockOutputScalarSignal.monitor().subscribe(function(e){
                    if(blockOutputScalarSignal.eq(Reactive.val(1)) ){
                        if(x==0){
                            baburaoMat.diffuse=baburaoTex2;
                            const timeoutTimer = Time.setTimeout(revertBaburao, timeInMilliseconds * 10);
                        }
                        
                        // Scene.destroy(blocknotcube);
                        x++;
                        if(khopdiAud==0){
                            Patches.inputs.setBoolean('PlayKhopdi',true);
                            //khopdiAud=1;
                        }
                        
                        Scene.destroy(blocknotcube);
                        currentGamlaCount=0;
                        Diagnostics.log(x);
                        
                        
                    }
                });
                // Do something with blockOutputScalarSignal
            }, function(error) {
                // output named blockOutput probably doesn't exist
                // or is not of scalar type, check error for details
                Diagnostics.log(error);
            });

            // Alternatively get scalar output with implicit
            // error handling - i.e. in case of error `blockOutputScalarSignal` will have value 0.   
            const blockOutputScalarSignal2 = myBlock.outputs.getScalarOrFallback('CollisionInt', 0);
         //   Diagnostics.watch("coll2",blockOutputScalarSignal2 );
        });

}


async function checkRajuColVal(blocknotcube,rajuMat,rajuTex2){
    var x=0;
    
        
        Scene.root.findFirst(blocknotcube.name).then(function(myBlock){
            
                
            // Get a scalar output
            myBlock.outputs.getScalar('CollisionIntRaju')
            .then(function(blockOutputScalarSignal){

                Diagnostics.watch("rajucoll",blockOutputScalarSignal );
                Diagnostics.log("Tripaolski");
                blockOutputScalarSignal.monitor().subscribe(function(e){
                    if(blockOutputScalarSignal.eq(Reactive.val(1)) ){
                        if(x==0){
                            rajuMat.diffuse=rajuTex2;
                            const timeoutTimer = Time.setTimeout(revertRaju, timeInMilliseconds * 10);
                        }

                        if(ChakkarAud==0){
                            Patches.inputs.setBoolean('PlayChakkar',true);
                            //ChakkarAud=1;
                        }
                        
                        // Scene.destroy(blocknotcube);
                        x++;
                       // Patches.inputs.setBoolean('PlayKhopdi',true);
                       
                        Scene.destroy(blocknotcube);
                        currentGamlaCount=0;
                        Diagnostics.log(x);
                        
                        
                    }
                });
                // Do something with blockOutputScalarSignal
            }, function(error) {
                // output named blockOutput probably doesn't exist
                // or is not of scalar type, check error for details
                Diagnostics.log('yangtze');
            });

            // Alternatively get scalar output with implicit
            // error handling - i.e. in case of error `blockOutputScalarSignal` will have value 0.   
            //const blockOutputScalarSignal2 = myBlock.outputs.getScalarOrFallback('CollisionInt', 0);
            //Diagnostics.watch("coll2",blockOutputScalarSignal2 );
        });

}



async function checkAnimComplete(blocknotcube){
   
        Scene.root.findFirst(blocknotcube.name).then(function(myBlock){
            
                
            // Get a scalar output
            myBlock.outputs.getScalar('animComplete')
            .then(function(blockOutputScalarSignal){
                //Diagnostics.watch("coll",blockOutputScalarSignal );

                blockOutputScalarSignal.monitor().subscribe(function(e){
                    if(blockOutputScalarSignal.eq(Reactive.val(1)) ){
                        currentGamlaCount=0;
                        Scene.destroy(blocknotcube);
                        
                        //return(false);
                        
                    }
                });
                
                
                

                // Do something with blockOutputScalarSignal
            }, function(error) {
                // output named blockOutput probably doesn't exist
                // or is not of scalar type, check error for details
                Diagnostics.log(error);
                
            });

            
            // Alternatively get scalar output with implicit
            // error handling - i.e. in case of error `blockOutputScalarSignal` will have value 0.   
            
        });

        //return(true);
}
async function timerRestart(){
    Patches.inputs.setPulse('StartTimer',Reactive.once())
}
 (async function () {  // Enables async/await in JS [part 1]
    Patches.inputs.setScalar('TimerStartTime',5);
    Patches.inputs.setPulse('StartTimer',Reactive.once());
     const [dummy,parent,button,plane0,ShootHead,raju]= await Promise.all([
         Scene.root.findFirst("dummy"),
         Scene.root.findFirst("parent"),
         Scene.root.findFirst("button"),
         Scene.root.findFirst("plane0"),
         Scene.root.findFirst("ShootHead"),
         Scene.root.findFirst("plane1"),
     ]);
 
     const [baburaoMat, rajuMat, baburaoTex1,baburaoTex2,rajuTex1,rajuTex2] = await Promise.all([
        Materials.findFirst('Baburao'),
        Materials.findFirst('Raju'),
        Textures.findFirst('1'),
        Textures.findFirst('2'),
        Textures.findFirst('3'),
        Textures.findFirst('4')
      ]);
    


      var timerDone= Patches.outputs.getBoolean('TimerDone');
     (await timerDone).monitor().subscribe(function(e){
        if(timerDone){
            Diagnostics.log("SIgma");
            Patches.inputs.setPulse('TimerReset',Reactive.once());
            Patches.inputs.setScalar('TimerStartTime',15);
            
            //Patches.inputs.setPulse('StartTimer',Reactive.once());
            const timeoutTimer = Time.setTimeout(timerRestart, timeInMilliseconds * 2);

           
        }
    });
    // Do something with blockOutputScalarSignal

    
     var blocknotcube;


     
     tapp.onTap(button).subscribe(async() => {
       
     // Switch materials depending on which one is currently applied to the plane
     if(currentGamlaCount<2){
         Patches.inputs.setBoolean('PlayKhopdi',false);
        Patches.inputs.setPulse('ResetKhopdi',Reactive.once());
        Patches.inputs.setBoolean('PlayChakkar',false);
        Patches.inputs.setPulse('ResetChakkar',Reactive.once());
        blocknotcube=await blocks.instantiate("gamla");
        currentGamlaCount=1;
        var shootHeadX=ShootHead.worldTransform.position.x;
        var shootHeadY=ShootHead.worldTransform.position.y;
        var shootHeadZ=ShootHead.worldTransform.position.z;
        //ShootHead.transform.position.z.sub(2)
        parent.addChild(blocknotcube);
        //blocknotcube.inputs.setVector('pos',Reactive.vector(dummy.worldTransform.position.x,dummy.worldTransform.position.y,dummy.worldTransform.position.z))
       // blocknotcube.inputs.setVector('pos',Reactive.vector(dummy.worldTransform.position.x,dummy.worldTransform.position.y,dummy.worldTransform.position.z))
        blocknotcube.inputs.setVector('pos',Reactive.vector(shootHeadX,shootHeadY,shootHeadZ))
        .then(function() {
            // Success
            Diagnostics.log("ying");
        }, function(error) {
            // input named blockInput probably doesn't exist
            // or is not of scalar type, check error for details
            Diagnostics.log("yang");
        });
        
        blocknotcube.inputs.setVector('rajuPos',Reactive.vector(raju.worldTransform.position.x,raju.worldTransform.position.y,raju.worldTransform.position.z))
        .then(function() {
            // Success
            Diagnostics.log("ping");
        }, function(error) {
            // input named blockInput probably doesn't exist
            // or is not of scalar type, check error for details
            Diagnostics.log("pong");
        });

       // ShootHead.transform.position=Reactive.point(shootHeadX,1,1);
       // ShootHead.transform.position=Reactive.vector(ShootHead.transform.position.x,ShootHead.transform.position.y,ShootHead.transform.position.z.sub(2));
        blocknotcube.inputs.setVector('targetPos',Reactive.vector(plane0.worldTransform.position.x,plane0.worldTransform.position.y,plane0.worldTransform.position.z))
        .then(function() {
            // Success
            Diagnostics.log("ding");
        }, function(error) {
            // input named blockInput probably doesn't exist
            // or is not of scalar type, check error for details
            Diagnostics.log("dong");
        });

        
        checkAnimComplete(blocknotcube);
        checkRajuColVal(blocknotcube,rajuMat,rajuTex2);
        checkColVal(blocknotcube,baburaoMat,baburaoTex2,baburaoTex1);
       
        
     }
     //Reactive.vector(0,0,-2)
     //dummy.worldTransform.position.x,dummy.worldTransform.position.y,dummy.worldTransform.position.z
    
     
    /* Diagnostics.watch("plane0 with block", checkCollision3D(
         plane0, blocknotcube,
         Reactive.point(0.1,0.1, 0.1), 
         Reactive.point(0.1, 0.1, 0.1),
     ));*/
    //Diagnostics.log(plane0.worldTransform.x);
    //Diagnostics.log("block x "+blocknotcube.worldTransform.x.toString.toString() +" y "+blocknotcube.worldTransform.y.toString()+" z "+blocknotcube.worldTransform.z.toString());
    //var myBoolean = false;
    
   // 
  

   });
     
  
    
     
   // To access scene objects
   // const [directionalLight] = await Promise.all([
   //   Scene.root.findFirst('directionalLight0')
   // ]);
 
   // To access class properties
   // const directionalLightIntensity = directionalLight.intensity;
 
   // To log messages to the console
   // Diagnostics.log('Console message logged from the script.');
 
 })(); // Enables async/await in JS [part 2]
 