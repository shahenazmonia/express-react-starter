const Universities = [
  {
    title: "Abant İzzet Baysal Üniversitesi",
    value: 1
  },
  {
    title: "Abdullah Gül Üniversitesi",
    value: 2
  },
  {
    title: "Acıbadem Üniversitesi",
    value: 3
  },
  {
    title: "Adana Bilim ve Teknoloji Üniversitesi",
    value: 4
  },
  {
    title: "Adnan Menderes Üniversitesi",
    value: 5
  },
  {
    title: "Adıyaman Üniversitesi",
    value: 6
  },
  {
    title: "Afyon Kocatepe Üniversitesi",
    value: 7
  },
  {
    title: "Ahi Evran Üniversitesi",
    value: 8
  },
  {
    title: "Akdeniz Üniversitesi",
    value: 9
  },
  {
    title: "Akev Üniversitesi",
    value: 10
  },
  {
    title: "Aksaray Üniversitesi",
    value: 11
  },
  {
    title: "Alanya Alaaddin Keykubat Üniversitesi",
    value: 12
  },
  {
    title: "Alanya Hamdullah Emin Paşa Üniversitesi",
    value: 13
  },
  {
    title: "Amasya Üniversitesi",
    value: 14
  },
  {
    title: "Anadolu Üniversitesi",
    value: 15
  },
  {
    title: "Anka Teknoloji Üniversitesi",
    value: 16
  },
  {
    title: "Ankara Sosyal Bilimler Üniversitesi",
    value: 17
  },
  {
    title: "Ankara Üniversitesi",
    value: 18
  },
  {
    title: "Ardahan Üniversitesi",
    value: 19
  },
  {
    title: "Artvin Çoruh Üniversitesi",
    value: 20
  },
  {
    title: "Atatürk Üniversitesi",
    value: 21
  },
  {
    title: "Atılım Üniversitesi",
    value: 22
  },
  {
    title: "Avrasya Üniversitesi",
    value: 23
  },
  {
    title: "Ağrı İbrahim Çeçen Üniversitesi",
    value: 24
  },
  {
    title: "Bahçeşehir Üniversitesi",
    value: 25
  },
  {
    title: "Balıkesir Üniversitesi",
    value: 26
  },
  {
    title: "Bandırma Onyedi Eylül Üniversitesi",
    value: 27
  },
  {
    title: "Bartın Üniversitesi",
    value: 28
  },
  {
    title: "Batman Üniversitesi",
    value: 29
  },
  {
    title: "Bayburt Üniversitesi",
    value: 30
  },
  {
    title: "Başkent Üniversitesi",
    value: 31
  },
  {
    title: "Beykent Üniversitesi",
    value: 32
  },
  {
    title: "Bezmiâlem Vakıf Üniversitesi",
    value: 33
  },
  {
    title: "Bilecik Şeyh Edebali Üniversitesi",
    value: 34
  },
  {
    title: "Bilkent Üniversitesi",
    value: 35
  },
  {
    title: "Bingöl Üniversitesi",
    value: 36
  },
  {
    title: "Biruni Üniversitesi",
    value: 37
  },
  {
    title: "Bitlis Eren Üniversitesi",
    value: 38
  },
  {
    title: "Bozok Üniversitesi",
    value: 39
  },
  {
    title: "Boğaziçi Üniversitesi",
    value: 40
  },
  {
    title: "Bursa Orhangazi Üniversitesi",
    value: 41
  },
  {
    title: "Bursa Teknik Üniversitesi",
    value: 42
  },
  {
    title: "Bülent Ecevit Üniversitesi",
    value: 43
  },
  {
    title: "Canik Başarı Üniversitesi",
    value: 44
  },
  {
    title: "Celal Bayar Üniversitesi",
    value: 45
  },
  {
    title: "Cumhuriyet Üniversitesi",
    value: 46
  },
  {
    title: "Çanakkale Onsekiz Mart Üniversitesi",
    value: 47
  },
  {
    title: "Çankaya Üniversitesi",
    value: 48
  },
  {
    title: "Çankırı Karatekin Üniversitesi",
    value: 49
  },
  {
    title: "Çağ Üniversitesi",
    value: 50
  },
  {
    title: "Çukurova Üniversitesi",
    value: 51
  },
  {
    title: "Deniz Harp Okulu",
    value: 52
  },
  {
    title: "Dicle Üniversitesi",
    value: 53
  },
  {
    title: "Dokuz Eylül Üniversitesi",
    value: 54
  },
  {
    title: "Doğuş Üniversitesi",
    value: 55
  },
  {
    title: "Dumlupınar Üniversitesi",
    value: 56
  },
  {
    title: "Düzce Üniversitesi",
    value: 57
  },
  {
    title: "Ege Üniversitesi",
    value: 58
  },
  {
    title: "Erciyes Üniversitesi",
    value: 59
  },
  {
    title: "Erzincan Üniversitesi",
    value: 60
  },
  {
    title: "Erzurum Teknik Üniversitesi",
    value: 61
  },
  {
    title: "Eskişehir Osmangazi Üniversitesi",
    value: 62
  },
  {
    title: "Fatih Sultan Mehmet Üniversitesi",
    value: 63
  },
  {
    title: "Fatih Üniversitesi",
    value: 64
  },
  {
    title: "Fırat Üniversitesi",
    value: 65
  },
  {
    title: "Galatasaray Üniversitesi",
    value: 66
  },
  {
    title: "Gazi Üniversitesi",
    value: 67
  },
  {
    title: "Gaziantep Üniversitesi",
    value: 68
  },
  {
    title: "Gaziosmanpaşa Üniversitesi",
    value: 69
  },
  {
    title: "Gebze Teknik Üniversitesi",
    value: 70
  },
  {
    title: "Gedik Üniversitesi",
    value: 71
  },
  {
    title: "Gediz Üniversitesi",
    value: 72
  },
  {
    title: "Giresun Üniversitesi",
    value: 73
  },
  {
    title: "Gülhane Askeri Tıp Akademisi",
    value: 74
  },
  {
    title: "Gümüşhane Üniversitesi",
    value: 75
  },
  {
    title: "Hacettepe Üniversitesi",
    value: 76
  },
  {
    title: "Hakkari Üniversitesi",
    value: 77
  },
  {
    title: "Haliç Üniversitesi",
    value: 78
  },
  {
    title: "Harran Üniversitesi",
    value: 79
  },
  {
    title: "Hasan Kalyoncu Üniversitesi",
    value: 80
  },
  {
    title: "Hava Harp Okulu",
    value: 81
  },
  {
    title: "Hitit Üniversitesi",
    value: 82
  },
  {
    title: "Iğdır Üniversitesi",
    value: 83
  },
  {
    title: "Işık Üniversitesi",
    value: 84
  },
  {
    title: "Kadir Has Üniversitesi",
    value: 85
  },
  {
    title: "Kafkas Üniversitesi",
    value: 86
  },
  {
    title: "Kahramanmaraş Sütçü İmam Üniversitesi",
    value: 87
  },
  {
    title: "Kanuni Üniversitesi",
    value: 88
  },
  {
    title: "Kara Harp Okulu",
    value: 89
  },
  {
    title: "Karabük Üniversitesi",
    value: 90
  },
  {
    title: "Karadeniz Teknik Üniversitesi",
    value: 91
  },
  {
    title: "Karamanoğlu Mehmetbey Üniversitesi",
    value: 92
  },
  {
    title: "Karatay Üniversitesi",
    value: 93
  },
  {
    title: "Kastamonu Üniversitesi",
    value: 94
  },
  {
    title: "Kilis 7 Aralık Üniversitesi",
    value: 95
  },
  {
    title: "Kocaeli Üniversitesi",
    value: 96
  },
  {
    title: "Konya Gıda Tarım Üniversitesi",
    value: 97
  },
  {
    title: "Koç Üniversitesi",
    value: 98
  },
  {
    title: "Kırklareli Üniversitesi",
    value: 99
  },
  {
    title: "Kırıkkale Üniversitesi",
    value: 100
  },
  {
    title: "MEF Üniversitesi",
    value: 101
  },
  {
    title: "Maltepe Üniversitesi",
    value: 102
  },
  {
    title: "Mardin Artuklu Üniversitesi",
    value: 103
  },
  {
    title: "Marmara Üniversitesi",
    value: 104
  },
  {
    title: "Mehmet Akif Ersoy Üniversitesi",
    value: 105
  },
  {
    title: "Melikşah Üniversitesi",
    value: 106
  },
  {
    title: "Mersin Üniversitesi",
    value: 107
  },
  {
    title: "Mevlana Üniversitesi",
    value: 108
  },
  {
    title: "Mimar Sinan Güzel Sanatlar Üniversitesi",
    value: 109
  },
  {
    title: "Murat Hüdavendigar Üniversitesi",
    value: 110
  },
  {
    title: "Mustafa Kemal Üniversitesi",
    value: 111
  },
  {
    title: "Muğla Sıtkı Koçman Üniversitesi",
    value: 112
  },
  {
    title: "Muş Alparslan Üniversitesi",
    value: 113
  },
  {
    title: "Namık Kemal Üniversitesi",
    value: 114
  },
  {
    title: "Necmettin Erbakan Üniversitesi**",
    value: 115
  },
  {
    title: "Nevşehir Hacı Bektaş Veli Üniversitesi",
    value: 116
  },
  {
    title: "Niğde Üniversitesi",
    value: 117
  },
  {
    title: "Nişantaşı Üniversitesi",
    value: 118
  },
  {
    title: "Nuh Naci Yazgan Üniversitesi",
    value: 119
  },
  {
    title: "İbn-u Haldun Üniversitesi",
    value: 120
  },
  {
    title: "İnönü Üniversitesi",
    value: 121
  },
  {
    title: "İpek Üniversitesi**",
    value: 122
  },
  {
    title: "İskenderun Teknik Üniversitesi",
    value: 123
  },
  {
    title: "İstanbul 29 Mayıs Üniversitesi",
    value: 124
  },
  {
    title: "İstanbul Arel Üniversitesi",
    value: 125
  },
  {
    title: "İstanbul Aydın Üniversitesi",
    value: 126
  },
  {
    title: "İstanbul Bilgi Üniversitesi",
    value: 127
  },
  {
    title: "İstanbul Bilim Üniversitesi",
    value: 128
  },
  {
    title: "İstanbul Esenyurt Üniversitesi",
    value: 129
  },
  {
    title: "İstanbul Gelişim Üniversitesi",
    value: 130
  },
  {
    title: "İstanbul Kemerburgaz Üniversitesi",
    value: 131
  },
  {
    title: "İstanbul Kültür Üniversitesi",
    value: 132
  },
  {
    title: "İstanbul Medeniyet Üniversitesi",
    value: 133
  },
  {
    title: "İstanbul Medipol Üniversitesi",
    value: 134
  },
  {
    title: "İstanbul Rumeli Üniversitesi",
    value: 135
  },
  {
    title: "İstanbul Sabahattin Zaim Üniversitesi",
    value: 136
  },
  {
    title: "İstanbul Teknik Üniversitesi",
    value: 137
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    value: 138
  },
  {
    title: "İstanbul Üniversitesi",
    value: 139
  },
  {
    title: "İstanbul Şehir Üniversitesi",
    value: 140
  },
  {
    title: "İstinye Üniversitesi",
    value: 141
  },
  {
    title: "İzmir Ekonomi Üniversitesi",
    value: 142
  },
  {
    title: "İzmir Kâtip Çelebi Üniversitesi",
    value: 143
  },
  {
    title: "İzmir Yüksek Teknoloji Enstitüsü",
    value: 144
  },
  {
    title: "İzmir Üniversitesi",
    value: 145
  },
  {
    title: "Okan Üniversitesi",
    value: 146
  },
  {
    title: "Ondokuz Mayıs Üniversitesi",
    value: 147
  },
  {
    title: "Ordu Üniversitesi",
    value: 148
  },
  {
    title: "Orta Doğu Teknik Üniversitesi",
    value: 149
  },
  {
    title: "Osmaniye Korkut Ata Üniversitesi",
    value: 150
  },
  {
    title: "Özyeğin Üniversitesi",
    value: 151
  },
  {
    title: "Pamukkale Üniversitesi",
    value: 152
  },
  {
    title: "Piri Reis Üniversitesi",
    value: 153
  },
  {
    title: "Polis Akademisi",
    value: 154
  },
  {
    title: "Recep Tayyip Erdoğan Üniversitesi",
    value: 155
  },
  {
    title: "Sabancı Üniversitesi",
    value: 156
  },
  {
    title: "Sakarya Üniversitesi",
    value: 157
  },
  {
    title: "Sanko Üniversitesi",
    value: 158
  },
  {
    title: "Sağlık Bilimleri Üniversitesi",
    value: 159
  },
  {
    title: "Selahattin Eyyubi Üniversitesi",
    value: 160
  },
  {
    title: "Selçuk Üniversitesi",
    value: 161
  },
  {
    title: "Siirt Üniversitesi",
    value: 162
  },
  {
    title: "Sinop Üniversitesi",
    value: 163
  },
  {
    title: "Süleyman Demirel Üniversitesi",
    value: 164
  },
  {
    title: "Süleyman Şah Üniversitesi",
    value: 165
  },
  {
    title: "Şifa Üniversitesi",
    value: 166
  },
  {
    title: "Şırnak Üniversitesi",
    value: 167
  },
  {
    title: "TED Üniversitesi",
    value: 168
  },
  {
    title: "TOBB Ekonomi ve Teknoloji Üniversitesi",
    value: 169
  },
  {
    title: "Toros Üniversitesi",
    value: 170
  },
  {
    title: "Trakya Üniversitesi",
    value: 171
  },
  {
    title: "Tunceli Üniversitesi",
    value: 172
  },
  {
    title: "Turgut Özal Üniversitesi",
    value: 173
  },
  {
    title: "Türk Alman Üniversitesi",
    value: 174
  },
  {
    title: "Türk Hava Kurumu Üniversitesi",
    value: 175
  },
  {
    title: "Türkiye Uluslararası İslam}, Bilim ve Teknoloji Üniversitesi",
    value: 176
  },
  {
    title: "Ufuk Üniversitesi",
    value: 177
  },
  {
    title: "Uludağ Üniversitesi",
    value: 178
  },
  {
    title: "Uluslararası Antalya Üniversitesi",
    value: 179
  },
  {
    title: "Uşak Üniversitesi",
    value: 180
  },
  {
    title: "Üsküdar Üniversitesi",
    value: 181
  },
  {
    title: "Yalova Üniversitesi",
    value: 182
  },
  {
    title: "Yaşar Üniversitesi",
    value: 183
  },
  {
    title: "Yeditepe Üniversitesi",
    value: 184
  },
  {
    title: "Yeni Yüzyıl Üniversitesi",
    value: 185
  },
  {
    title: "Yüksek İhtisas Üniversitesi**",
    value: 186
  },
  {
    title: "Yüzüncü Yıl Üniversitesi",
    value: 187
  },
  {
    title: "Yıldırım Beyazıt Üniversitesi",
    value: 188
  },
  {
    title: "Yıldız Teknik Üniversitesi",
    value: 189
  },
  {
    title: "Zirve Üniversitesi",
    value: 190
  },
  {
    title: "Ankara Hacı Bayram Veli Üniversitesi",
    value: 190
  }
];

export default Universities;
