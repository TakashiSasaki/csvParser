export NODEDIR=/drives/p/node-win-x64
export NODE=$(if $(shell which node),node,$(NODEDIR)/node.exe)
export NPM=$(if $(shell which npm),npm,$(NODEDIR)/npm.cmd)

