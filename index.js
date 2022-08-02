/* eslint-disable no-magic-numbers */

// eslint-disable-next-line no-unused-vars
const DuskSDK = window.DuskSDK = {
  package: {
    name: 'dusk-sdk',
    version: '0.5.5'
  },
  Browser: () => {
    const isHomeScreenApp = (
      window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches
    );

    // Render stylesheet

    const css = document.createElement('style');

    css.setAttribute('type', 'text/css');

    css.appendChild(
      document.createTextNode(`
        @keyframes hide {
          from {
            opacity: 1;
            top: 10px;
          }
          to {
            opacity: 0;
            top: -100px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shakeLeftRight {
          0% {
            transform: translate3d(-10px, 0, 0);
          }
          10% {
            transform: translate3d(20px, 0, 0);
          }
          20% {
            transform: translate3d(-20px, 0, 0);
          }
          30% {
            transform: translate3d(10px, 0, 0);
          }
          40% {
            transform: translate3d(-10px, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          background: #19181b;
        }

        body {
          display: flex;
          flex-direction: column;
          margin: 0;
          min-width: 100vw;
          min-height: 100vh;
          font: 400 normal 18px "Manrope", sans-serif;
          color: rgb(10, 20, 25);
          overflow: hidden;

        }

        p, a, h1, h2, h3, h4, h5, h6, button {
          -webkit-font-smoothing: antialiased;
        }

        h1 {
          color: white;
          text-align: center;
          font-size: 2.4em;
        }

        a {
          color: #00d8ff;
          text-decoration: none;
          font-size:  14px;
        }

        a,
        button {
          cursor: pointer;
          outline: none;
          transition: color .5s ease;
        }

        a:hover {
          text-decoration: underline;
        }

        p.left {
          text-align: left;
        }

        p.right {
          text-align: right;
        }

        p.center {
          text-align: center;
        }

        .full {
          width: 100%;
          height: 100%;
        }

        .full-vh {
          min-height: 100vh;
          max-height: 100vh;
        }

        .flex {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flex.column {
          flex-direction: column;
        }

        .flex.end {
          align-items: flex-end;
          justify-content: flex-end;
        }

        .flex.start {
          align-items: flex-start;
          justify-content: flex-start;
        }

        .flex.around {
          align-items: center;
          justify-content: space-around;
        }

        .flex.between {
          align-items: center;
          justify-content: space-between;
        }

        .flex > * {
          flex: 1;
        }

        .scroll-y {
          overflow-y: auto;
        }

        .hr {
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, .1);
          margin: .5rem 0;
        }

        #main {
          display: flex;
          flex: 1;
          width: 100%;
          overflow-x: hidden;
        }

        #main > * {
          padding: 25px;
        }

        #notification {
          position: fixed;
          color: white;
          background: black;
          box-sizing: border-box;
          top: -100px;
          left: 1rem;
          right: 1rem;
          border-radius: 14px;
          padding: 0 14px;
          width: calc(100% - 2rem);
          height: 50px;
          line-height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1em;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
          z-index: 1000;
          transition: top .5s ease, opacity .5s ease;
        }

        #notification.show {
          top: 10px;
        }

        #notification.error {
          background: #f44336;
        }

        #content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 5rem;
          padding: 1rem;
          align-self: center;
        }

        #tabs.disobstruct + #content {
          max-width: 100%;
        }

        #content > h1 {
          flex: 1;
          display: block;
          color: transparent;
          min-height: 100%;
          min-width: 100%;
          margin: 0;
          font-size: 2.9em;
          line-height: .8em;
        }

        #content > input {
          background: #111;
          font: 400 normal 14px "Manrope", sans-serif;
          width: 400px;
          max-width: 90%;
          height: 28px;
          border-radius: 15px;
          border: none;
          padding: 1.5rem 1rem;
          color: white;
          align-self: center;
          outline: none;
        }

        #loading {
          position: fixed;
          min-width: 100vw;
          min-height: 100vh;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, .5);
          display: none;
          z-index: 600;
        }

        #loading.show {
          display: flex;
        }

        #loader {
          background: white;
          max-width: 8rem;
          max-height: 4rem;
          line-height: 4rem;
          border-radius: 1rem;
          color: black;
          text-align: center;
          font-weight: 800;
        }


        #apps {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(4, 4rem);
          grid-gap: 0 1.5rem;
          min-height: 15rem;
          max-height: 15rem;
          margin: 2rem 0 0;
          padding: 0;
        }

        #apps > li {
          display: flex;
          justify-content: center;
          background: black;
          border-radius: 1rem;
          border: 1px solid black;
          box-shadow: 0 2px 0 black, inset 0 25px rgb(255 255 255 / 15%), 0 0 2rem black;
          width: 4rem;
          height: 4rem;
        }

        #apps > li > a,
        #apps > li > a:hover {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }

        #apps > li > a > p {
          flex: 1;
          margin-top: 5rem;
          color: white;
          font-weight: 600;
          font-size: .8em;
          text-align: center;
          text-transform: capitalize;
        }

        #nav {
          display: flex;
          list-style: none;
          margin: 0 0 20px;
          padding: 10px 0;
          justify-content: space-around;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          font-weight: 800;
        }

        #nav > li > a {
          display: block;
          color: black;
          text-transform: capitalize;
        }

        #main {
          display: flex;
          height: 100%;
        }

        #tabs {
          position: fixed;
          width: 15rem;
          height: 100%;
          max-height: calc(100% - 2rem);
          transition: opacity .25s linear, transform .5s cubic-bezier(1, 0, 0, 1);
          background: black;
          color: white;
          font: 800 normal 1em "Manrope", sans-serif;
          border-radius: 1rem;
          box-shadow: 0 0 3rem black;
          list-style: none;
          margin: 1rem;
          padding: 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #8c8c8d black;
          z-index: 700;
        }

        #tabs::-webkit-scrollbar {
          width: 5px;
        }

        #tabs::-webkit-scrollbar-track {
          background: black;
        }

        #tabs::-webkit-scrollbar-thumb {
          background: #8c8c8d;
          border-radius: 100vw;
          outline: none;
        }

        #tabs ::selection {
          background: transparent;
        }

        #content,
        #post {
          padding-left: 16rem;
        }

        #tabs > li {
          margin: 1px 0;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: start;
        }

        #tabs > li.category {
          color: #666;
          font-size: .5em;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          height: 2rem;
        }

        #tabs > li.active {
          border-left: solid 2px #00d8ff;
        }

        #tabs > li:first-of-type {
          background: rgba(0, 0, 0, 0.1);
          margin: 0;
          opacity: 1;
        }

        #tabs > li > .icon {
          display: block;
          min-width: 1.6rem;
          min-height: 1.6rem;
          border-radius: .5rem;
          background-size: 108%;
          background-position: center center;
          background-repeat: no-repeat;
        }

        #tabs > li:first-of-type > .icon {
          filter: saturate(0);
        }

        #tabs > li:first-of-type:hover > .icon {
          filter: saturate(1);
        }

        #tabs > li > a {
          display: flex;
          align-items: center;
          color: white;
          text-overflow: ellipsis;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          height: 100%;
          margin-left: 8px;
          font-weight: 600;
        }

        #tabs > li:not(:first-of-type) > a {
          text-transform: capitalize;
        }

        #tabs > li:first-of-type > a,
        #tabs > li:nth-of-type(2) > a {
          font-weight: 600;
        }

        #tabs > li > a > span.new-tab {
          display: inline-block;
          transform: rotateX(180deg);
          margin-left: .25em;
        }

        #tabs > li > a > span.app-label {
          flex: 1;
          display: block;
          background: white;
          color: black;
          border-radius: 100vw;
          max-width: 2rem;
          margin-left: .3rem;
          padding: 0 .16rem;
          line-height: 1rem;
          height: 1rem;
          font-size: .6em;
          text-align: center;
          text-transform: capitalize;
        }

        #tabs > li > a > span.app-label.dev {
          background: #f1f742;
          font-weight: 500;
        }

        #tabs > li > a > span.app-label.alpha {
          background: #5c4d94;
        }

        #tabs > li > a > span.app-label.beta {
          background: #45df40;
          color: white;
        }

        #tab-button {
          display: none;
          position: fixed;
          width: 3.5rem;
          height: 3.5rem;
          margin: .5rem;
          padding: 0;
          background: black;
          color: white;
          appearance: none;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 0 3rem black;
          transition: left .5s ease;
          -webkit-tap-highlight-color: transparent;
          z-index: 750;
        }

        #tab-button.open {
          background: transparent;
          box-shadow: none;
          margin: 0;
          left: calc(12.5rem);
          top: 1rem;
          opacity: .5;
        }

        #tabs.disobstruct {
          transform: translate3d(-16rem, 0, 0);
        }

        #tabs.disobstruct + * {
          margin-left: auto;
          width: 100%;
        }

        #tabs.disobstruct.open {
          transform: translate3d(0, 0, 0);
        }

        #tab-button.disobstruct {
          display: block;
        }

        @media (max-width: 900px) {
          #tabs {
            transform: translate3d(-16rem, 0, 0);
          }

          #tabs.open {
            transform: translate3d(0, 0, 0);
            padding: 0 0 ${isHomeScreenApp ? '0' : '120px'};
          }

          #tab-button {
            display: block;
          }

          #content,
          #post {
            margin-left: auto;
            width: 100%;
          }

          #main > * {
            padding: 0;
          }

          #content {
            max-width: 100%;
            padding: 1rem;
          }

          #notification {
            width: calc(100% - 20px);
            left: 10px;
          }
        }
      `)
    );

    // Instantiate loader

    const content = document.getElementById('content');

    if (content) {
      const loading = document.createElement('aside');

      loading.setAttribute('id', 'loading');
      loading.setAttribute('class', 'flex center');

      loading.innerHTML = (
        `<div id="loader" class="flex center">Loading...</div>`
      );

      content.insertBefore(loading, content.firstElementChild);
    }

    document.head.insertBefore(css, document.head.children[1]);
  },
  Tabs: ({
    rootElement,
    rootPath,
    className = '',
    onRender,
    onLoad,
    orgTab,
    appTab: {
      name,
      devStatus,
      iconPath
    }
  }) => {
    document.getElementById('tabs').remove();

    const element = document.createElement('div');

    element.innerHTML = `
      <button id="tab-button" class="${className}">☰</button>
      <ul id="tabs" class="${className}">
        ${!orgTab ? '' : `
          <li>
            <span class="icon" style="background-image: url(${orgTab.iconPath});"></span>
            <a href="/">${orgTab.name}</a>
          </li>
        `}
        <li>
          ${!iconPath ? '' : `<span class="icon" style="background-image: url(${iconPath});"></span>`}
          <a href="${rootPath}">
            ${name}
            ${!devStatus ? '' : `
              <span class="app-label ${devStatus}">${devStatus}</span>
            `}
          </a>
        </li>
      </ul>
    `;

    Array.from(element.children).reverse().forEach(child => (
      rootElement.insertBefore(child, rootElement.firstElementChild)
    ));

    const onOpen = () => {
      const tabs = document.getElementById('tabs');
      const tabButton = document.getElementById('tab-button');

      tabButton.setAttribute('class', `${className} open`);
      tabs.setAttribute('class', `${className} open`);
      tabButton.onclick = onClose;
      tabButton.innerHTML = '';

      setTimeout(() => (
        tabButton.innerHTML = '✕'
      ), 300);
    };

    const onClose = () => {
      const tabs = document.getElementById('tabs');
      const tabButton = document.getElementById('tab-button');

      tabButton.setAttribute('class', className);
      tabs.setAttribute('class', className);
      tabButton.onclick = onOpen;
      tabButton.innerHTML = '';

      setTimeout(() => {
        const tabButton = document.getElementById('tab-button');

        tabButton.innerHTML = '☰';
      }, 300);
    };

    const tabButton = document.getElementById('tab-button');

    tabButton.onclick = onOpen;
    requestAnimationFrame(onLoad);

    return {
      onOpen,
      onClose,
      onRender,
      onLoad
    };
  },
  Responsive: ({ frame } = { frame: null }) => {
    const onResize = () => {
      const isFocused = Boolean(
        document.querySelectorAll('input:focus').length
      );

      setTimeout(() => {
        document.body.height = window.innerHeight;

        if (frame) {
          frame.setAttribute('style', `max-height: ${window.innerHeight}px`);
        }

        if (!isFocused) {
          window.scrollTo(0, 0);
        }
      }, 500);
    };

    const isMobile = (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );

    if (isMobile) {
      document.addEventListener('touchmove', event => {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      }, { passive: false });

      window.onresize = onResize;

      onResize();
    }

    return {
      isMobile,
      onResize
    };
  },
  system: {
    onLoadStart: () => {
      const loading = document.getElementById('loading');

      if (loading) {
        loading.setAttribute('class', 'flex center show');
      }
    },
    onLoadEnd: () => {
      const loading = document.getElementById('loading');

      if (loading) {
        loading.setAttribute('class', 'flex center');
      }
    }
  }
};
