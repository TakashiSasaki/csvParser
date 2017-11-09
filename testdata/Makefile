all: hello.utf8 hello.sjis hello.utf16

%.utf8 : %.txt
	iconv -t UTF-8 $< >$@ ; nkf --guess $@

%.utf16 : %.txt
	iconv -t UTF-16 $< >$@ ; nkf --guess $@

%.sjis : %.txt
	iconv -t Shift_JIS $< >$@ ; nkf --guess $@

clean:
	rm -f hello.utf8 hello.sjis hello.utf16

.PHONY: all clean

