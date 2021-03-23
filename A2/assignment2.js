//4 4
//1 2
//4 1
//2 3
//3 1

const fs = require("fs")


// Part 1
function cycleCheck(){
  
  let f = fileParser("case2.txt")
  
  let N = f[0][0]
  let M = f[0][2]
  
  f.shift()

  numList = []
  
  for (const elem of f){
    head  = elem.split(" ")
    numList.push([head[0],head[1]])
  }
  return recursePath(numList,[],[])
}


function recursePath(data,entP,exitP){
  //base cases
 //path length
 let j = 0
 let i = 0
  while (i < data.length){
    entP.push(data[i][1])
    exitP.push(data[i][0])
    j = visitedPaths(entP, exitP)
    if (j == 1){
      console.log(1)
      return  1;
    }
   i+=1
  }
  if (j == 1){
    console.log(1)
    return 1;
  }else{
    console.log(0)
    return 0;
  }
}


function visitedPaths(entP,exitP,v=[]){
 console.log(v)
 if (v.length>0){
  let x = 0
  let y = 0
  let counter = 0;
   for (let e1 of v){
    for (let e2 of v){
      if (v[x]==v[y] && x!=y){
        counter +=1
      }
      y+=1
    }
    x+=1
   }
   if (counter == 1){
   // console.log("1")
    return 1;
   }
  let last = v.length -1
  let i = 0;
  let isThere= false; 
   while(i < entP.length){
      if (v[last] == exitP[i]){
        if (exitP.includes(entP[i])){
          v.push(entP[i])
          isThere = true;
          return visitedPaths(entP,exitP,v)
        }
      }
    i+=1
   }
   if (!isThere ){
    return 0;
   }

 }

  if (v.length > entP.length){
      return 0;
  }
  
  if(v.length<1 && entP.length>2){
    
    
    let latestEnt = entP[entP.length-1]
    let ent2 = entP[entP.length-2]
    let ext2 = exitP[exitP.length-2]

   //check 1:1 cyclicality 
   if(exitP[exitP.length-1]==ent2 && latestEnt == ext2){
      return 1;
    }
    
   if(exitP[exitP.length-1]==ent2 || latestEnt==ext2){
      pos=0
      v.push(ent2)
      v.push(latestEnt)
      return visitedPaths(entP,exitP,v)
    }else {
      return 0;
    }
  }else {
    return 0
  }

  

}



/**---------------------------------------**/
//Part 2


function topology(){
  
  f = fileParser("case3p3.txt")
  let numList = []
  for (const elem of f){
    head  = elem.split(" ")
    numList.push([head[0],head[1]])
  }
  let N = numList[0][0]
  let M = numList[0][1]
  
  numList.shift()
  return topOrder(numList,N,M)
  
}

function topOrder(lst,v,e,order=[]){
  //base case
  // filling in gaps of missing verticies in order
  if (order.length<v && e == 0){
    let i= 1;
    while (i<=v){
      let isPresent = false;
      for (let item of order){
        if(i == item){
          isPresent = true;
        }
      }
      if (!isPresent){
        order.unshift(i.toString())
      }
      i+=1
    }
    console.log(order)
    return order;
  }
  
  if (lst.length == 0){
    console.log(order)
    return order;
  }
  
  if(order.length == 0){
    order.push(lst[0][0])
    order.push(lst[0][1])
    lst.shift()
    return topOrder(lst,v,e-1,order)
  }

  if(order.length>0){
    let x = order.length
    if (order.includes(lst[0][0])){
      if (order.includes(lst[0][1])){
        lst.shift()
        return topOrder(lst,v,e-1,order)
      }else{
        let ind = order.indexOf(lst[0][0])
        order.splice(ind, 0, lst[0][1])
        return topOrder(lst,v,e-1)
      }
    }
     else if(order.includes(lst[0][1])){
      order.unshift(lst[0][0])
      lst.shift()
      return topOrder(lst,v,e-1)
    }

    if(lst[0][0] == order[x-1]){
      order.push(lst[0][1])
      lst.shift()
      return topOrder(lst,v,e-1,order)
    }
    else if(lst[0][1] == order[x-2]){
      order.unshift(lst[0][0])
      lst.shift()
      return topOrder(lst,v,e-1,order)
    }else if(lst[0][0] == order[x-1]){
      order.push(lst[0][1])
      lst.shift()
      return topOrder(lst,v,e-1,order)
    }else if(lst[0][1] == order[x-2]){
      order.unshift(lst[0][1])
      lst.shift()
      return topOrder(lst,v,e-1,order)
    }else{
      order.push(lst[0][0])
      order.push(lst[0][1])
      lst.shift()
      return topOrder(lst,v,e-1,order)
    }
  }

  
}















function fileParser(fileName){
  
  let data = fs.readFileSync(fileName)
  let textByLine = data.toString("utf-8").split("\n")
  
  if (textByLine[textByLine.length-1] == ''){
    textByLine.pop()
  }
  return textByLine

}


//visitedPaths(['1','4'],['2','1'])
//cycleCheck()
topology()

