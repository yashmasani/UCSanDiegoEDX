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

function fileparser(file){
  const data = fs.readFileSync(file)
  let text = data.toString("utf-8").split("\n")
  if(text[text.length-1] == ""){
    text.pop()
  }

  return text
  
}

console.log(shortestpath("case1p1.txt"))
