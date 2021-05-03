const fs = require("fs")

function shortestpath(file){
  
  const data = fileparser(file)
  
  const lst=[]
  data.shift()
  for (const d of data){
    let a = d.split(" ")
    lst.push([parseInt(a[0],10),parseInt(a[1],10),parseInt(a[2],10)])
  }
  
  let goal = lst[lst.length-1]
  lst.pop() 
  const dist = []
  
  const shortpath = recursePath(lst,goal)
  return (shortpath || -1)

}

function recursePath(data,goal,path=[],dist=[]){
 
  const indexes = outNodeIndex(data,goal)
  for (let i of indexes){
    let u = data[i][0]
    let v = data[i][1]
    if(path.includes(v)){
      continue;
    }
    if (v == goal[1]){
      if(!dist[v]){
        dist[v] = data[i][2] + (dist[u] || 0)
      }else{
        if(dist[v] > (data[i][2] + (dist[u] || 0))){
          dist[v] = data[i][2] + (dist[u] || 0)
        }
      }
      continue;
    }else if (dist[v]){
      if(dist[v] > (data[i][2] + (dist[u] || 0))){
        dist[v] = data[i][2] + (dist[u] || 0)
      }
      
      path.push(v)
      const newG = []
      newG.push(v)
      newG.push(goal[1])
      const res = [...path]
      recursePath(data,newG,path,dist)
      path= res
    }else{
      dist[v] = data[i][2] + (dist[u] || 0)
      const newG = []
      newG.push(v)
      newG.push(goal[1])
      path.push(v)
      const res = [...path]
      recursePath(data,newG,path,dist)
      path= res
    }
  }
  return dist[goal[1]]

}


function outNodeIndex(data,goal){
  
  let i =0
  const indexes = []
  while (i<data.length){
    if (data[i][0] == goal[0]){
      indexes.push(i)
    }
   i+=1
  }
  return indexes

}





function negCyc(){
  
  const data = fileparser("case2p2.txt")
  data.shift()
  
  const numList = []
   
  for (const d of data){
    const n = d.split(" ")
    numList.push([parseInt(n[0],10),parseInt(n[1],10),parseInt(n[2],10)])
  }
  
  numList.pop()
  
  
  return checkNegative(numList)
}

function checkNegative(data,path=[],dist=[],check=false){
  
  console.log(path)
  if(path.length ==0){
   for (const d of data){
     let u = d[0]
     let v = d[1]
     
     path.push(u)
     path.push(v)
      
     if (!dist[v]){
      dist[v] = d[2]+ (dist[u] || 0)
     }else{
        if(dist[v]>d[2]+(distt[u]||0)){
          dist[v] = d[2]+ (dist[u] || 0)
        }
     }
     let check = checkNegative(data,path,dist)
     if (check){
      return true
     }
     path = [] 
     dist = []
   }

  }else{
    const p = path[path.length-1]
    
    const indexes = outNodeIndex(data,[p])
    
    for (const index of indexes){
      if (check){
        return true
      }
      if (path[0] == data[index][1]){
        dist[path[0]] = dist[p]+data[index][2]
        if (dist[path[0]] < 0){
          check = true
          return true
        }
      }else{
        if (path.includes(data[index][1])){
          continue;
        }else{
          path.push(data[index][1])
          dist[data[index][1]]= dist[p]+data[index][2]
          check = checkNegative(data,path,dist) 
        }
      }
    }
    
    
  }
  return check
}




//checks if next node or incoming nodes contain  negative cycle
function negativeChecker(data,path,dist,check=false,backToPav=false){
 
  
  let p = path[path.length-1]
  let indexes = outNodeIndex(data,[p,0])
  if (backToPav && check){
    return true;
  }
  for (const index of indexes){
    
    if (check && backToPav){
      return true
    }
    
    if(path[0] == data[index][1]){
      if((dist[p] || 0) + data[index][2] < 0){
        check=true
        backToPav=true
        console.log(check,backToPav,"---")
      }
    }else if(path.includes(data[index][1])){
      if((dist[p]||0) + data[index][2] < 0 ){
        check=true
        //if exists path to pav
        console.log("here")
        if(reach(data,[data[index][1],path[0]])){
          backToPav = true
        }
      }
    }else{
      let pathClone = [...path]
      let v = data[index][1]
      path.push(data[index][1])
      if(!dist[v]){
        dist[v] = (dist[p] || 0) + data[index][2]
      }else{
        if(dist[v]>((dist[p]||0) + data[index][2] )){
          dist[v] = (dist[p] || 0) + data[index][2]
        } 
      }
      check =  negativeChecker(data,path,dist,check,backToPav)
      backToPav = check
      if (!check){
        path=pathClone
      }
    }
     
  }
  return (check && backToPav)
}




function optimal(){
  const data = fileparser("case3p1.txt")
  
  let a =  data.shift()
  let output = [0]
  output.length = parseInt(a[0]) + 1
  let u = data.pop()
  output[u]=0
  const numList = []
  for (const d of data ){
    if (d.length > 1){
      let head = d.split(" ")
      numList.push([parseInt(head[0],10),parseInt(head[1],10),parseInt(head[2],10)])
    }    
  }
  let o = recurseOptimum(numList,u,[],[],output)
  
  let i = 0
  while(i<o.length){
    if(typeof o[i] == "undefined"){
      o[i]= "*"
    }
  i++
  }

  o.shift()
  return o
  //return negativeChecker(numList,[3],[])
}



function recurseOptimum(data,u,path=[],dist=[],output=[]){
    
  if(path.length == 0){
    let goal=[u,0]
    let indexes = outNodeIndex(data,goal)
    
    for (const index of indexes){
      dist[data[index][1]] = data[index][2]
      
      path.push(data[index][1])
      output = recurseOptimum(data,u,path,dist,output)  
    }
        
  }else{
    
    let p = path.length-1
    let check = negativeChecker(data,[path[p]],[])
    let reacher = reach(data,[u,path[p]])
    if(check){
      output[path[p]] = "-"
    }else if((output[p])!="-" && reacher){
      output[path[p]] = dist[path[p]]
    }else{
      output[path[p]] = "*"
    }
  
    let indexes = outNodeIndex(data,[path[p],0])
    console.log(indexes,path) 
    for (const index of indexes){
      if (path.includes(data[index][1])){
        //pass
      }else if(check){
        output[data[index][1]] = "-"
        const clonePath = [...path]
        path.push(data[index][1])  
        output = recurseOptimum(data,u,path,dist,output)
        path = clonePath
      }else if(output[path[p] == "*"]){
        output[data[index][1]] = "*"
        const clonePath = [...path]
        path.push(data[index][1])
        output = recurseOptimum(data,u,path,dist,output)
        path = clonePath
      }else{
       if (dist[data[index][1]] && dist[data[index][1]]>(dist[path[p]]+data[index][2])){
        dist[data[index][1]] = dist[path[p]]+data[index][2]
        output[data[index][1]] = dist[data[index][1]]
        const clonePath = [...path]
        path.push(data[index][1])
        output = recurseOptimum(data,u,path,dist,output)
        path = clonePath
       }else if(!dist[data[index][1]]){
        dist[data[index][1]] = dist[path[p]]+data[index][2]
        output[data[index][1]] = dist[data[index][1]]
        const clonePath = [...path]
        path.push(data[index][1])
        output = recurseOptimum(data,u,path,dist,output)
        path = clonePath
       }
    

      }
    }
    

  }
  return output 
}

function fileparser(file){
  const data = fs.readFileSync(file)
  let text = data.toString("utf-8").split("\n")
  if(text[text.length-1] == ""){
    text.pop()
  }

  return text
  
}

function reach(data,goal,path=[],isReach=false){
  

 let indexes;
 if (path.length==0){
  
  path.push(goal[0])
  indexes = outNodeIndex(data,goal)
 }else{
  let p = path[path.length-1]
  indexes = outNodeIndex(data,[p,0])
 }

  for (const index of indexes){
    if(isReach){
      return true
    }
    if(data[index][1] == goal[1]){
      isReach = true
      return true
    }else if(path.includes(data[index][1])){
     //return
    }else{
      path.push(data[index][1])
      const pathClone = [...path]
      isReach = reach(data,goal,path,isReach)
      path = pathClone
    }
  }
  return isReach
}


//console.log(shortestpath("case1p1.txt"))
//console.log(negCyc())
console.log(optimal())
