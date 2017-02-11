rm -rf ../supervisor/node_modules/network-protocol
rm -rf ../login-server/node_modules/network-protocol
cp -avr ./network-protocol ../login-server/node_modules/network-protocol
cp -avr ./network-protocol ../supervisor/node_modules/network-protocol

rm -rf ../login-server/node_modules/logging
rm -rf ../supervisor/node_modules/logging
cp -avr ./logging ../login-server/node_modules/logging
cp -avr ./logging ../supervisor/node_modules/logging

