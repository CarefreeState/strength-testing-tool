function reversePrettyButtons(asc) {
  return asc === "asc" ? "desc" : "asc"
}

function clickPrettyButtons({ clickOption, active, win_rate, avg_duration, avg_damage, avg_heal }) {
  return {
    // 当前激活的是 win_rate 并且点击的也是 win_rate 则反向，否则保持原状
    win_rate: active === 'win_rate' && clickOption === active ? reversePrettyButtons(win_rate) : win_rate,
    avg_duration: active === 'avg_duration' && clickOption === active ? reversePrettyButtons(avg_duration) : avg_duration,
    avg_damage: active === 'avg_damage' && clickOption === active ? reversePrettyButtons(avg_damage) : avg_damage,
    avg_heal: active === 'avg_heal' && clickOption === active ? reversePrettyButtons(avg_heal) : avg_heal,
    // 激活项最终一定是 clickOption
    active: clickOption,
  }
}

function getPrettyButtons({active, win_rate, avg_duration, avg_damage, avg_heal }) {
  return [
    {
      label: '胜率',
      option: 'win_rate',
      sort: win_rate,
      active: active === 'win_rate'
    },
    {
      label: '平均总治疗',
      option: 'avg_heal',
      sort: avg_heal,
      active: active === 'avg_heal'
    },
    {
      label: '平均总输出',
      option: 'avg_damage',
      sort: avg_damage,
      active: active === 'avg_damage'
    },
    {
      label: '平均战斗时长',
      option: 'avg_duration',
      sort: avg_duration,
      active: active === 'avg_duration'
    },
  ]

}

function getSelected(ids) {
  const ret = [];
  if (ids && ids.length) {
    for (const id of ids) {
      if (id !== 0 && id !== null && id !== undefined) {
        ret.push(`${id}`);
      }
    }
  }
  return ret;
}

function getMetric(metrics, active) {

  switch (active) {
    case 'win_rate':
      return metrics.win_rate;
    case 'avg_duration':
      return metrics.avg_duration;
    case 'avg_damage':
      return metrics.avg_damage;
    case 'avg_heal':
      return metrics.avg_heal;
    default:
      return metrics.win_rate;
  }
}

function getSort(sort, active) {

  switch (active) {
    case 'win_rate':
      return sort.win_rate;
    case 'avg_duration':
      return sort.avg_duration;
    case 'avg_damage':
      return sort.avg_damage;
    case 'avg_heal':
      return sort.avg_heal;
    default:
      return sort.win_rate;
  }
}

function parseKey(key, indexMap) {
  if (!key) return [[], [], [], [], [], []];
  
  const parts = key.split('-[').map(part => 
    part.replace(/[\[\]]/g, '')
  );

  const ret = parts.map((part, index) => { 
    if(part === "None") {
      return []   
    }
    return part.split('-').map((num)=> {
      return indexMap[index][num];
    })
  })
  return ret
}

export {
  parseKey,
  getMetric,
  getSort,
  getSelected,
  getPrettyButtons,
  clickPrettyButtons,
  reversePrettyButtons,
}