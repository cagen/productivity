function FindProxyForURL(url, host) {
  musicHost = "*.music.126.net";
  if(shExpMatch(host,musicHost)){return "PROXY localhost:8003"}
  return "DIRECT";
}