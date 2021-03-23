//find an exit of a maze
//
//sample input:
//44 <- indicates the total n vertices, m edges
//12 <- u and v vertices connected components
//32 
//43 
//14 
//14 <- check if path exists between 1 and 4 = in this case,there are two 
//paths  1-4 and 1-2-3-4
//

fs = require("fs")

const readline  = require("readline").createInterface({
  input: process.stdin,
  output:process.stdout
});



function pathCheck(file){
  
  f = fileParser(file)
  N = f[0][0]
  M = f[0][2] 
  f.shift()
  let pathToCheck = f.pop()

  return recursePaths([],f,pathToCheck);
}

function recursePaths(path,f,pathToCheck){
  
  let len = path.length
  if (len > 0){
    let startpoint = path[0]
    let endpoint = path[len-1]
 
    if (startpoint == pathToCheck[0] && endpoint == pathToCheck[2]){
      console.log("1");
       return 1;
    }
  }
  if (f.length < 1){
    console.log("0")
    return 0;
  }

  //list of 2 vertices of current path
  n = (f[0]).split(' ')
  
  if (path[len-1] != n[1] && len > 0){
    
    return recursePaths([],f,pathToCheck)

  }
  //base case
  if (len == 0){
    path.push(n[0])
    path.push(n[1])
    f.shift()
  }
  else { 
    path.push(n[0])
    f.shift()
  }
  return recursePaths(path,f,pathToCheck)
  
}


function fileParser(fileName){
  
  let data = fs.readFileSync(fileName)
  let textByLine = data.toString("utf-8").split("\n") 
  if (textByLine[textByLine.length-1] == ''){
    textByLine.pop()
  }
  return textByLine
}




function mazeExits(fileName){
   
  let f = fileParser(fileName)
  let N = parseInt(f[0][0],10)
  let M = parseInt(f[0][2],10)
  f.shift()
  
  return recurseMaze(f, N,M,0,[])
}
// N vertices
// M edges
function recurseMaze(lst, N, M, inc,path){
  
  if (M == 0){
    if (N > 0){
      console.log(inc + N)
      return inc + N
    }else{
      console.log(inc)
      return inc
    }
  }
  let currentSpot = lst[0].split(" ")
  if (path.length > 0){
    
    /**if (currentSpot[1] == path[path.length-1]){
      path.push(currentSpot[0])
      lst.shift()
      return recurseMaze(lst,N-1,M-1,inc,path)
    }
    if (currentSpot[0] ==path[path.length-2]){
      path.push(currentSpot[1])
      lst.shift()
      return recurseMaze(lst,N-1,M-1,inc,path)
    }**/
    
    for(let num of path ){
      if (currentSpot[0] == num){  
       path.push(currentSpot[1])
       lst.shift()
       return recurseMaze(lst,N-1,M-1,inc,path)
      }
      if (currentSpot[1] == num){  
       path.push(currentSpot[0])
       lst.shift()
       return recurseMaze(lst,N-1,M-1,inc,path)
      }
    }

  }
  path.push(currentSpot[0])
  path.push(currentSpot[1])
  lst.shift()
  
  return recurseMaze(lst, N-2, M-1,inc+1,path)
}



readline.question("Enter file name please...",name=>{
  mazeExits(name) 
  readline.close()
})

//pathCheck("data.txt")
//console.log(mazeExits())
