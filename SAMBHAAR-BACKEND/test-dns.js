const dns = require('dns').promises;

async function testDNS() {
  try {
    console.log("Testing DNS resolution...");
    
    // Test basic domain
    const result = await dns.resolve4('sambhaar-online.iplk0.mongodb.net');
    console.log("✅ Domain resolved to:", result);
    
    // Test SRV record
    const srv = await dns.resolveSrv('_mongodb._tcp.sambhaar-online.iplk0.mongodb.net');
    console.log("✅ SRV record:", srv);
    
  } catch (err) {
    console.error("❌ DNS Error:", err.message);
  }
}

testDNS();