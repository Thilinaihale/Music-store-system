export const customCss = `
  body {
    margin: 0;
    padding-top: 60px; /* space for the fixed nav bar */
  }
  #service-links-panel {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    padding: 10px 24px;
    margin: 0;
    color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 60px;
    box-sizing: border-box;
  }
  #service-links-panel h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #fff !important;
    white-space: nowrap;
  }
  #service-links-panel .links-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-grow: 1;
  }
  #service-links-panel a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #e0e0e0;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 13px;
    white-space: nowrap;
  }
  #service-links-panel a:hover {
    background: rgba(255,255,255,0.2);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  #service-links-panel a.active {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.8);
    color: #fff;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(255,255,255,0.2);
  }
  #service-links-panel .link-port {
    font-size: 11px;
    opacity: 0.6;
    margin-left: 4px;
  }
  .randomize-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    margin: 6px 0;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .randomize-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102,126,234,0.4);
  }
`;

export const customJsStr = `
(function() {
  var spec = null;

  fetch("/api-docs.json")
    .then(function(r) { return r.json(); })
    .then(function(s) { spec = s; });

  /* ---- helpers ---- */
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function hexChar() { return "0123456789abcdef"[randInt(0, 15)]; }
  function objectId() { var s = ""; for (var i = 0; i < 24; i++) s += hexChar(); return s; }

  var firstNames = ["Amal","Nisha","Kamal","Shen","Ravi","Priya","Dinesh","Mala","Tharindu","Sanduni","Kasun","Nimali"];
  var lastNames = ["Perera","Silva","Fernando","Jayasinghe","Bandara","Wijesinghe","Gunawardena","Rajapaksa"];
  var streets = ["12 Galle Rd","45 Kandy Rd","78 Temple Ln","23 Lake Dr","9 Park Ave","56 Duplication Rd","101 High Level Rd"];
  var cities = ["Colombo","Kandy","Galle","Jaffna","Matara","Negombo","Kurunegala","Anuradhapura"];
  var provinces = ["Western","Central","Southern","Northern","Eastern","Sabaragamuwa","Uva","North Western"];
  var countries = ["Sri Lanka"];
  var labels = ["Home","Office","Warehouse","Shop","Studio"];
  var brands = ["Yamaha","Fender","Roland","Gibson","Casio","Pearl","Zildjian","Korg","Ibanez","Marshall"];
  var prodNames = ["Acoustic Guitar","Electric Guitar","Digital Piano","Drum Kit","Violin","Bass Guitar","Synthesizer","Ukulele","Cajon","Flute","Trumpet","Microphone","Amplifier","Tuner","Guitar Strings Set"];
  var carriers = ["DHL","FedEx","UPS","Sri Lanka Post","Kapruka Delivery","PickMe Flash"];
  var categories = ["strings","percussion","keyboard","wind","brass","accessories"];
  var descriptions = ["Premium quality instrument","Professional grade","Beginner friendly model","Limited edition","Handcrafted with care","Studio quality","Best seller","Competition grade"];

  function randomName() { return pick(firstNames) + " " + pick(lastNames); }
  function randomEmail() { return pick(firstNames).toLowerCase() + randInt(10,999) + "@" + pick(["gmail.com","yahoo.com","outlook.com"]); }
  function randomPassword() { return "Pass" + randInt(1000,9999) + pick(["!","#","@"]); }
  function randomPhone() { return "+9477" + randInt(1000000,9999999); }
  function randomPrice() { return Math.round((Math.random() * 4500 + 50) * 100) / 100; }
  function randomDate() { var d = new Date(); d.setDate(d.getDate() + randInt(1,30)); return d.toISOString(); }
  function randomTrack(c) { return (c || "TRK") + "-" + randInt(100000,999999); }
  function randomImage() { return "https://example.com/img-" + randInt(1,500) + ".jpg"; }

  function resolveSchema(s) {
    if (!s || !spec) return s;
    if (s["$ref"]) {
      var parts = s["$ref"].replace("#/","").split("/");
      var cur = spec;
      for (var i = 0; i < parts.length; i++) cur = cur[parts[i]];
      return cur || s;
    }
    return s;
  }

  function genValue(prop, key) {
    if (!prop) return "";
    if (prop["$ref"]) return genObj(resolveSchema(prop));
    if (prop["enum"]) return pick(prop["enum"]);
    var k = (key || "").toLowerCase();
    switch (prop.type) {
      case "string":
        if (prop.format === "email") return randomEmail();
        if (prop.format === "date-time") return randomDate();
        if (k.indexOf("password") >= 0) return randomPassword();
        if (k === "name" && !k.match(/track|product/)) return randomName();
        if (k.indexOf("phone") >= 0) return randomPhone();
        if (k.indexOf("street") >= 0) return pick(streets);
        if (k.indexOf("city") >= 0) return pick(cities);
        if (k.indexOf("province") >= 0) return pick(provinces);
        if (k.indexOf("zip") >= 0) return "0" + randInt(1000,9999);
        if (k.indexOf("country") >= 0) return pick(countries);
        if (k.indexOf("label") >= 0 || k.indexOf("lable") >= 0) return pick(labels);
        if (k.indexOf("brand") >= 0) return pick(brands);
        if (k.indexOf("description") >= 0) return pick(descriptions);
        if (k.indexOf("carrier") >= 0) return pick(carriers);
        if (k.indexOf("tracking") >= 0) return randomTrack(pick(carriers).substring(0,3).toUpperCase());
        if (k.indexOf("notes") >= 0) return pick(["Handle with care","Fragile","Leave at door","Call before delivery"]);
        if (k.indexOf("productid") >= 0 || k.indexOf("orderid") >= 0 || k.indexOf("userid") >= 0) return objectId();
        if (k === "name") return pick(brands) + " " + pick(prodNames);
        return pick(prodNames);
      case "number":
        if (k.indexOf("price") >= 0 || k.indexOf("unitprice") >= 0) return randomPrice();
        return Math.round(Math.random() * 1000 * 100) / 100;
      case "integer":
        if (k.indexOf("stock") >= 0) return randInt(1, 100);
        if (k.indexOf("quantity") >= 0) return randInt(1, 10);
        return randInt(1, 50);
      case "boolean":
        return Math.random() > 0.5;
      case "array":
        if (prop.items) return [genValue(prop.items, key)];
        return [];
      case "object":
        if (prop.properties) return genObj(prop);
        return {};
      default:
        return "";
    }
  }

  function genObj(schema) {
    var s = resolveSchema(schema);
    if (!s || !s.properties) return {};
    var result = {};
    var keys = Object.keys(s.properties);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = genValue(s.properties[keys[i]], keys[i]);
    }
    return result;
  }

  /* ---- links panel ---- */
  function insertLinksPanel() {
    if (document.getElementById("service-links-panel")) return;
    var panel = document.createElement("div");
    panel.id = "service-links-panel";
    
    var currentPort = window.location.port;
    if (!currentPort) currentPort = "80";
    
    panel.innerHTML =
      '<h3>\\ud83d\\udd17 API Hub</h3>' +
      '<div class="links-grid">' +
        '<a href="http://localhost:3000/api-docs" class="' + (currentPort === "3000" ? "active" : "") + '"><span>\\ud83c\\udf10</span> API Gateway<span class="link-port">:3000</span></a>' +
        '<a href="http://localhost:4000/api-docs" class="' + (currentPort === "4000" ? "active" : "") + '"><span>\\ud83d\\udd11</span> User Service<span class="link-port">:4000</span></a>' +
        '<a href="http://localhost:4001/api-docs" class="' + (currentPort === "4001" ? "active" : "") + '"><span>\\ud83d\\udce6</span> Product Service<span class="link-port">:4001</span></a>' +
        '<a href="http://localhost:4002/api-docs" class="' + (currentPort === "4002" ? "active" : "") + '"><span>\\ud83d\\uded2</span> Order Service<span class="link-port">:4002</span></a>' +
        '<a href="http://localhost:4003/api-docs" class="' + (currentPort === "4003" ? "active" : "") + '"><span>\\ud83d\\ude9a</span> Delivery Service<span class="link-port">:4003</span></a>' +
      '</div>';
    
    document.body.insertBefore(panel, document.body.firstChild);
  }

  /* ---- randomize buttons ---- */
  function addRandomizeBtn(textarea) {
    if (!textarea || textarea.parentNode.querySelector(".randomize-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "randomize-btn";
    btn.textContent = "\\ud83c\\udfb2 Randomize";
    btn.onclick = function(e) {
      e.preventDefault();
      if (!spec) return;
      var opblock = textarea.closest(".opblock");
      if (!opblock) return;
      var pathEl = opblock.querySelector(".opblock-summary-path");
      var methodEl = opblock.querySelector(".opblock-summary-method");
      if (!pathEl || !methodEl) return;
      var path = (pathEl.getAttribute("data-path") || pathEl.textContent).trim();
      var method = methodEl.textContent.trim().toLowerCase();
      var pathSpec = spec.paths[path];
      if (!pathSpec || !pathSpec[method]) return;
      var reqBody = pathSpec[method].requestBody;
      if (!reqBody || !reqBody.content || !reqBody.content["application/json"]) return;
      var schema = reqBody.content["application/json"].schema;
      var resolved = resolveSchema(schema);
      var data = genObj(resolved);
      textarea.value = JSON.stringify(data, null, 2);
      var ev = new Event("change", { bubbles: true });
      textarea.dispatchEvent(ev);
      var inputEv = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEv);
    };
    textarea.parentNode.insertBefore(btn, textarea);
  }

  function scanForTextareas() {
    var areas = document.querySelectorAll("textarea.body-param__text");
    for (var i = 0; i < areas.length; i++) addRandomizeBtn(areas[i]);
  }

  function init() {
    insertLinksPanel();
    setInterval(scanForTextareas, 1000);
    var sw = document.querySelector(".swagger-ui");
    if (sw) {
      var observer = new MutationObserver(function() { scanForTextareas(); });
      observer.observe(sw, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;
