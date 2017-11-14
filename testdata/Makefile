all: hello.utf8 hello.sjis hello.utf16

%.utf8 : %.txt
	iconv -f UTF-8 -t UTF-8 $< >$@ ; nkf --guess $@

%.utf16 : %.txt
	iconv -f UTF-8 -t UTF-16 $< >$@ ; nkf --guess $@

%.sjis : %.txt
	iconv -f UTF-8 -t Shift_JIS $< >$@ ; nkf --guess $@

clean:
	rm -f hello.utf8 hello.sjis hello.utf16

.PHONY: all clean

