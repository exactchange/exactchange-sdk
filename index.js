module.exports = {
  package: {
    name: 'dusk-sdk',
    version: '0.0.1'
  },
  Tabs: ({
    rootElement,
    onRender,
    onLoad,
    orgTab,
    appTab,
    appTab: {
      devStatus
    }
  }) => {
    const element = document.createElement('div');

    element.innerHTML = `
      <button id="tab-button">☰</button>
      <ul id="tabs">
        <li>
          <span class="icon"></span>
          <a href="/">${orgTab.name}</a>
        </li>
        <li>
          <span class="icon"></span>
          <a href="/payphone/?channel=#general">
            ${appTab.name}
            ${devStatus && `
              <span class="app-label ${devStatus}">${devStatus}</span>
            `}
          </a>
        </li>
      </ul>
    `;

    Array.from(element.children).reverse().forEach(child => (
      rootElement.insertBefore(child,rootElement.firstElementChild)
    ));

    const onOpen = () => {
      const tabs = document.getElementById('tabs');
      const tabButton = document.getElementById('tab-button');

      tabButton.setAttribute('class', 'open');
      tabs.setAttribute('class', 'open');
      tabButton.onclick = onClose;
      tabButton.innerHTML = '';

      setTimeout(() => (
        tabButton.innerHTML = '✕'
      ), 300);
    };

    const onClose = () => {
      const tabs = document.getElementById('tabs');
      const tabButton = document.getElementById('tab-button');

      tabButton.removeAttribute('class');
      tabs.removeAttribute('class');
      tabButton.onclick = onOpen;
      tabButton.innerHTML = '';

      setTimeout(() => {
        const tabButton = document.getElementById('tab-button');

        tabButton.innerHTML = '☰';
      }, 300);
    };

    requestAnimationFrame(onLoad);

    return {
      onOpen,
      onClose,
      onRender,
      onLoad
    };
  }
};
