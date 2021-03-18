// import insertCss from 'insert-css';
var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}


// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const model = e.item.getModel();
    if (e.item.getType() === 'node') {
      outDiv.innerHTML = `${model.properties.user_id}<br/>${model.properties.member_id}`;
    } else {
      const source = e.item.getSource();
      const target = e.item.getTarget();
      outDiv.innerHTML = `来源：${source.getModel().properties.user_id}<br/>去向：${target.getModel().properties.user_id}`;
    }
    return outDiv;
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    preventOverlap: true,
    edgeStrength: 0.4,
  },
  plugins: [tooltip],
  modes: {
    default: ['drag-canvas', 'activate-relations'],
  },
  defaultNode: {
    size: 20,
    /* style for the keyShape */
    // style: {
    //   lineWidth: 2,
    //   fill: '#DEE9FF',
    //   stroke: '#5B8FF9',
    // },
  },
  defaultEdge: {
    /* style for the keyShape */
    style: {
      stroke: '#aaa',
      lineAppendWidth: 2,
//       opacity: 0.3,
    },
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  // nodeStateStyles: {
  //   active: {
  //     opacity: 1,
  //   },
  //   inactive: {
  //     opacity: 0.2,
  //   },
  // },
  // edgeStateStyles: {
  //   active: {
  //     stroke: '#999',
  //   },
  // },
});

// fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
//   .then((res) => res.json())
//   .then((data) => {
//     graph.data(data);
//     graph.render();
//   });

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// var data = {"directed": false, "multigraph": false, "graph": {}, "nodes": [{"name": 0, "id": 0}, {"name": 1, "id": 1}, {"name": 2, "id": 2}, {"name": 3, "id": 3}, {"name": 4, "id": 4}, {"name": 5, "id": 5}, {"name": 6, "id": 6}, {"name": 7, "id": 7}, {"name": 8, "id": 8}, {"name": 9, "id": 9}, {"name": 10, "id": 10}, {"name": 11, "id": 11}, {"name": 12, "id": 12}, {"name": 13, "id": 13}, {"name": 14, "id": 14}], "links": [{"source": 0, "target": 1}, {"source": 0, "target": 2}, {"source": 0, "target": 3}, {"source": 0, "target": 4}, {"source": 0, "target": 5}, {"source": 1, "target": 2}, {"source": 1, "target": 3}, {"source": 1, "target": 4}, {"source": 1, "target": 5}, {"source": 2, "target": 3}, {"source": 2, "target": 4}, {"source": 2, "target": 5}, {"source": 3, "target": 4}, {"source": 3, "target": 5}, {"source": 4, "target": 5}, {"source": 5, "target": 6}, {"source": 6, "target": 7}, {"source": 7, "target": 8}, {"source": 8, "target": 9}, {"source": 9, "target": 10}, {"source": 9, "target": 11}, {"source": 9, "target": 12}, {"source": 9, "target": 13}, {"source": 9, "target": 14}, {"source": 10, "target": 11}, {"source": 10, "target": 12}, {"source": 10, "target": 13}, {"source": 10, "target": 14}, {"source": 11, "target": 12}, {"source": 11, "target": 13}, {"source": 11, "target": 14}, {"source": 12, "target": 13}, {"source": 12, "target": 14}, {"source": 13, "target": 14}]};
// var data = JSON.parse(decodeURIComponent(getQueryVariable("parm")));

G6.Util.processParallelEdges(data.edges);
data.edges.forEach((edge) => {
  edge.style.endArrow = {
      path: G6.Arrow.triangle()
    };
  edge.style.stroke = '#F6BD16';
  edge.style.endArrow.fill = '#F6BD16';
});

graph.data(data);
graph.render();


graph.on('node:dragstart', function (e) {
  graph.layout();
  refreshDragedNodePosition(e);
});
graph.on('node:drag', function (e) {
  refreshDragedNodePosition(e);
});
graph.on('node:dragend', function (e) {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});


if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };


if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}
