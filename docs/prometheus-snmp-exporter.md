# Prometheus SNMP Exporter

Consult the [upstream Prometheus SNMP Exporter documentation](https://github.com/prometheus/snmp_exporter/blob/main/README.md) for detailed information on the exporter.

There is also an [SNMP Exporter Config Generator](https://github.com/prometheus/snmp_exporter/blob/main/generator/README.md) that can be used to generate a `snmp.yml` file which is passed to the pod as text via `monitoring.values.snmpExporter.config`.

In the Big Bang Monitoring package, Prometheus SNMP Exporter is optional and is disabled by default.

If you would like to enable the SNMP exporter, set `monitoring.values.snmpExporter.enabled` to `true` in the Big Bang Umbrella chart via an override:

```yaml
monitoring:
  ...
  values:
    ...
    snmpExporter:
      enabled: true
      ...
```

You will also need to provide a variety of other configuration options. Here are some suggestions:

- `monitoring.values.networkPolicies.additionalPolicies` to allow the SNMP exporter to communicate with an external SNMP server
- `monitoring.values.snmpExporter.config` to configure the SNMP exporter to scrape the desired SNMP metrics
- `monitoring.values.snmpExporter.serviceMonitor` to configure the service monitor for the SNMP exporter
- `monitoring.values.prometheusSpec.additionalScrapeConfigs` to configure Prometheus to scrape the SNMP exporter and relabel the results

## Example Configuration

Utilizing [PySNMP's Simulation Service](https://www.pysnmp.com/snmp-simulation-service#simulated-data), below is a minimal, example override file to be used in conjunction with the Big Bang umbrella Helm chart.

**Note**: Big Bang does not maintain or control the PySNMP Simulation Service. Exercise caution and best security practices before connecting to this third party service.

```overrides.yaml```

```yaml
istio:
  enabled: true
istioOperator:
  enabled: true
monitoring:
  enabled: true
  git:
    tag: null
    branch: "140-snmp_exporter-add-on-to-prometheus"
  sso:
    enabled: true
    prometheus:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-prometheus
    alertmanager:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-alertmanager
  values:
    networkPolicies:
      additionalPolicies:
      - name: allow-egress-to-demo-pysnmp-com
        spec:
          podSelector: {}
          policyTypes:
          - Egress
          egress:
          - to:
            - ipBlock:
                cidr: 20.163.207.223/32 # IP address of demo.pysnmp.com
    snmpExporter:
      enabled: true
      config: |
        # WARNING: This file was auto-generated using snmp_exporter generator, manual changes will be lost.
        auths:
          public_v2:
            community: public
            security_level: noAuthNoPriv
            username: user
            password: pass
            auth_protocol: MD5
            priv_protocol: DES
            priv_password: otherPass
            context_name: context
            version: 2
        modules:
          if_mib:
            walk:
            - 1.3.6.1.2.1.2
            get:
            - 1.3.6.1.2.1.1.3.0
            - 1.3.6.1.2.1.31.1.1.1.6.40
            - 1.3.6.1.4.1.14179.2.1.1.1.2.2
            - 1.3.6.1.4.1.14179.2.1.1.1.2.3
            - 1.3.6.1.4.1.14179.2.1.1.1.2.4
            metrics:
            - name: sysUpTime
              oid: 1.3.6.1.2.1.1.3
              type: gauge
              help: The time (in hundredths of a second) since the network management
                portion of the system was last re-initialized. - 1.3.6.1.2.1.1.3
            - name: ifNumber
              oid: 1.3.6.1.2.1.2.1
              type: gauge
              help: The number of network interfaces (regardless of their current
                state) present on this system. - 1.3.6.1.2.1.2.1
            - name: ifIndex
              oid: 1.3.6.1.2.1.2.2.1.1
              type: gauge
              help: A unique value, greater than zero, for each interface - 1.3.6.1.2.1.2.2.1.1
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifDescr
              oid: 1.3.6.1.2.1.2.2.1.2
              type: DisplayString
              help: A textual string containing information about the interface -
                1.3.6.1.2.1.2.2.1.2
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifType
              oid: 1.3.6.1.2.1.2.2.1.3
              type: gauge
              help: The type of interface - 1.3.6.1.2.1.2.2.1.3
              indexes:
              - labelname: ifIndex
                type: gauge
              enum_values:
                1: other
                2: regular1822
                3: hdh1822
                4: ddnX25
                5: rfc877x25
                6: ethernetCsmacd
                7: iso88023Csmacd
                8: iso88024TokenBus
                9: iso88025TokenRing
                10: iso88026Man
                11: starLan
                12: proteon10Mbit
                13: proteon80Mbit
                14: hyperchannel
                15: fddi
                16: lapb
                17: sdlc
                18: ds1
                19: e1
                20: basicISDN
                21: primaryISDN
                22: propPointToPointSerial
                23: ppp
                24: softwareLoopback
                25: eon
                26: ethernet3Mbit
                27: nsip
                28: slip
                29: ultra
                30: ds3
                31: sip
                32: frameRelay
                33: rs232
                34: para
                35: arcnet
                36: arcnetPlus
                37: atm
                38: miox25
                39: sonet
                40: x25ple
                41: iso88022llc
                42: localTalk
                43: smdsDxi
                44: frameRelayService
                45: v35
                46: hssi
                47: hippi
                48: modem
                49: aal5
                50: sonetPath
                51: sonetVT
                52: smdsIcip
                53: propVirtual
                54: propMultiplexor
                55: ieee80212
                56: fibreChannel
                57: hippiInterface
                58: frameRelayInterconnect
                59: aflane8023
                60: aflane8025
                61: cctEmul
                62: fastEther
                63: isdn
                64: v11
                65: v36
                66: g703at64k
                67: g703at2mb
                68: qllc
                69: fastEtherFX
                70: channel
                71: ieee80211
                72: ibm370parChan
                73: escon
                74: dlsw
                75: isdns
                76: isdnu
                77: lapd
                78: ipSwitch
                79: rsrb
                80: atmLogical
                81: ds0
                82: ds0Bundle
                83: bsc
                84: async
                85: cnr
                86: iso88025Dtr
                87: eplrs
                88: arap
                89: propCnls
                90: hostPad
                91: termPad
                92: frameRelayMPI
                93: x213
                94: adsl
                95: radsl
                96: sdsl
                97: vdsl
                98: iso88025CRFPInt
                99: myrinet
                100: voiceEM
                101: voiceFXO
                102: voiceFXS
                103: voiceEncap
                104: voiceOverIp
                105: atmDxi
                106: atmFuni
                107: atmIma
                108: pppMultilinkBundle
                109: ipOverCdlc
                110: ipOverClaw
                111: stackToStack
                112: virtualIpAddress
                113: mpc
                114: ipOverAtm
                115: iso88025Fiber
                116: tdlc
                117: gigabitEthernet
                118: hdlc
                119: lapf
                120: v37
                121: x25mlp
                122: x25huntGroup
                123: transpHdlc
                124: interleave
                125: fast
                126: ip
                127: docsCableMaclayer
                128: docsCableDownstream
                129: docsCableUpstream
                130: a12MppSwitch
                131: tunnel
                132: coffee
                133: ces
                134: atmSubInterface
                135: l2vlan
                136: l3ipvlan
                137: l3ipxvlan
                138: digitalPowerline
                139: mediaMailOverIp
                140: dtm
                141: dcn
                142: ipForward
                143: msdsl
                144: ieee1394
                145: if-gsn
                146: dvbRccMacLayer
                147: dvbRccDownstream
                148: dvbRccUpstream
                149: atmVirtual
                150: mplsTunnel
                151: srp
                152: voiceOverAtm
                153: voiceOverFrameRelay
                154: idsl
                155: compositeLink
                156: ss7SigLink
                157: propWirelessP2P
                158: frForward
                159: rfc1483
                160: usb
                161: ieee8023adLag
                162: bgppolicyaccounting
                163: frf16MfrBundle
                164: h323Gatekeeper
                165: h323Proxy
                166: mpls
                167: mfSigLink
                168: hdsl2
                169: shdsl
                170: ds1FDL
                171: pos
                172: dvbAsiIn
                173: dvbAsiOut
                174: plc
                175: nfas
                176: tr008
                177: gr303RDT
                178: gr303IDT
                179: isup
                180: propDocsWirelessMaclayer
                181: propDocsWirelessDownstream
                182: propDocsWirelessUpstream
                183: hiperlan2
                184: propBWAp2Mp
                185: sonetOverheadChannel
                186: digitalWrapperOverheadChannel
                187: aal2
                188: radioMAC
                189: atmRadio
                190: imt
                191: mvl
                192: reachDSL
                193: frDlciEndPt
                194: atmVciEndPt
                195: opticalChannel
                196: opticalTransport
                197: propAtm
                198: voiceOverCable
                199: infiniband
                200: teLink
                201: q2931
                202: virtualTg
                203: sipTg
                204: sipSig
                205: docsCableUpstreamChannel
                206: econet
                207: pon155
                208: pon622
                209: bridge
                210: linegroup
                211: voiceEMFGD
                212: voiceFGDEANA
                213: voiceDID
                214: mpegTransport
                215: sixToFour
                216: gtp
                217: pdnEtherLoop1
                218: pdnEtherLoop2
                219: opticalChannelGroup
                220: homepna
                221: gfp
                222: ciscoISLvlan
                223: actelisMetaLOOP
                224: fcipLink
                225: rpr
                226: qam
                227: lmp
                228: cblVectaStar
                229: docsCableMCmtsDownstream
                230: adsl2
                231: macSecControlledIF
                232: macSecUncontrolledIF
                233: aviciOpticalEther
                234: atmbond
                235: voiceFGDOS
                236: mocaVersion1
                237: ieee80216WMAN
                238: adsl2plus
                239: dvbRcsMacLayer
                240: dvbTdm
                241: dvbRcsTdma
                242: x86Laps
                243: wwanPP
                244: wwanPP2
                245: voiceEBS
                246: ifPwType
                247: ilan
                248: pip
                249: aluELP
                250: gpon
                251: vdsl2
                252: capwapDot11Profile
                253: capwapDot11Bss
                254: capwapWtpVirtualRadio
                255: bits
                256: docsCableUpstreamRfPort
                257: cableDownstreamRfPort
                258: vmwareVirtualNic
                259: ieee802154
                260: otnOdu
                261: otnOtu
                262: ifVfiType
                263: g9981
                264: g9982
                265: g9983
                266: aluEpon
                267: aluEponOnu
                268: aluEponPhysicalUni
                269: aluEponLogicalLink
                270: aluGponOnu
                271: aluGponPhysicalUni
                272: vmwareNicTeam
                277: docsOfdmDownstream
                278: docsOfdmaUpstream
                279: gfast
                280: sdci
                281: xboxWireless
                282: fastdsl
                283: docsCableScte55d1FwdOob
                284: docsCableScte55d1RetOob
                285: docsCableScte55d2DsOob
                286: docsCableScte55d2UsOob
                287: docsCableNdf
                288: docsCableNdr
                289: ptm
                290: ghn
                291: otnOtsi
                292: otnOtuc
                293: otnOduc
                294: otnOtsig
                295: microwaveCarrierTermination
                296: microwaveRadioLinkTerminal
                297: ieee8021axDrni
                298: ax25
                299: ieee19061nanocom
                300: cpri
                301: omni
                302: roe
                303: p2pOverLan
            - name: ifMtu
              oid: 1.3.6.1.2.1.2.2.1.4
              type: gauge
              help: The size of the largest packet which can be sent/received on the
                interface, specified in octets - 1.3.6.1.2.1.2.2.1.4
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifSpeed
              oid: 1.3.6.1.2.1.2.2.1.5
              type: gauge
              help: An estimate of the interface's current bandwidth in bits per second
                - 1.3.6.1.2.1.2.2.1.5
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifPhysAddress
              oid: 1.3.6.1.2.1.2.2.1.6
              type: PhysAddress48
              help: The interface's address at its protocol sub-layer - 1.3.6.1.2.1.2.2.1.6
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifAdminStatus
              oid: 1.3.6.1.2.1.2.2.1.7
              type: gauge
              help: The desired state of the interface - 1.3.6.1.2.1.2.2.1.7
              indexes:
              - labelname: ifIndex
                type: gauge
              enum_values:
                1: up
                2: down
                3: testing
            - name: ifOperStatus
              oid: 1.3.6.1.2.1.2.2.1.8
              type: gauge
              help: The current operational state of the interface - 1.3.6.1.2.1.2.2.1.8
              indexes:
              - labelname: ifIndex
                type: gauge
              enum_values:
                1: up
                2: down
                3: testing
                4: unknown
                5: dormant
                6: notPresent
                7: lowerLayerDown
            - name: ifLastChange
              oid: 1.3.6.1.2.1.2.2.1.9
              type: gauge
              help: The value of sysUpTime at the time the interface entered its current
                operational state - 1.3.6.1.2.1.2.2.1.9
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInOctets
              oid: 1.3.6.1.2.1.2.2.1.10
              type: counter
              help: The total number of octets received on the interface, including
                framing characters - 1.3.6.1.2.1.2.2.1.10
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInUcastPkts
              oid: 1.3.6.1.2.1.2.2.1.11
              type: counter
              help: The number of packets, delivered by this sub-layer to a higher
                (sub-)layer, which were not addressed to a multicast or broadcast
                address at this sub-layer - 1.3.6.1.2.1.2.2.1.11
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInNUcastPkts
              oid: 1.3.6.1.2.1.2.2.1.12
              type: counter
              help: The number of packets, delivered by this sub-layer to a higher
                (sub-)layer, which were addressed to a multicast or broadcast address
                at this sub-layer - 1.3.6.1.2.1.2.2.1.12
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInDiscards
              oid: 1.3.6.1.2.1.2.2.1.13
              type: counter
              help: The number of inbound packets which were chosen to be discarded
                even though no errors had been detected to prevent their being deliverable
                to a higher-layer protocol - 1.3.6.1.2.1.2.2.1.13
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInErrors
              oid: 1.3.6.1.2.1.2.2.1.14
              type: counter
              help: For packet-oriented interfaces, the number of inbound packets
                that contained errors preventing them from being deliverable to a
                higher-layer protocol - 1.3.6.1.2.1.2.2.1.14
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInUnknownProtos
              oid: 1.3.6.1.2.1.2.2.1.15
              type: counter
              help: For packet-oriented interfaces, the number of packets received
                via the interface which were discarded because of an unknown or unsupported
                protocol - 1.3.6.1.2.1.2.2.1.15
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutOctets
              oid: 1.3.6.1.2.1.2.2.1.16
              type: counter
              help: The total number of octets transmitted out of the interface, including
                framing characters - 1.3.6.1.2.1.2.2.1.16
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutUcastPkts
              oid: 1.3.6.1.2.1.2.2.1.17
              type: counter
              help: The total number of packets that higher-level protocols requested
                be transmitted, and which were not addressed to a multicast or broadcast
                address at this sub-layer, including those that were discarded or
                not sent - 1.3.6.1.2.1.2.2.1.17
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutNUcastPkts
              oid: 1.3.6.1.2.1.2.2.1.18
              type: counter
              help: The total number of packets that higher-level protocols requested
                be transmitted, and which were addressed to a multicast or broadcast
                address at this sub-layer, including those that were discarded or
                not sent - 1.3.6.1.2.1.2.2.1.18
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutDiscards
              oid: 1.3.6.1.2.1.2.2.1.19
              type: counter
              help: The number of outbound packets which were chosen to be discarded
                even though no errors had been detected to prevent their being transmitted
                - 1.3.6.1.2.1.2.2.1.19
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutErrors
              oid: 1.3.6.1.2.1.2.2.1.20
              type: counter
              help: For packet-oriented interfaces, the number of outbound packets
                that could not be transmitted because of errors - 1.3.6.1.2.1.2.2.1.20
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutQLen
              oid: 1.3.6.1.2.1.2.2.1.21
              type: gauge
              help: The length of the output packet queue (in packets). - 1.3.6.1.2.1.2.2.1.21
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifSpecific
              oid: 1.3.6.1.2.1.2.2.1.22
              type: OctetString
              help: A reference to MIB definitions specific to the particular media
                being used to realize the interface - 1.3.6.1.2.1.2.2.1.22
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifHCInOctets
              oid: 1.3.6.1.2.1.31.1.1.1.6
              type: counter
              help: The total number of octets received on the interface, including
                framing characters - 1.3.6.1.2.1.31.1.1.1.6
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: bsnDot11EssSsid
              oid: 1.3.6.1.4.1.14179.2.1.1.1.2
              type: DisplayString
              help: SSID assigned to ESS(WLAN) - 1.3.6.1.4.1.14179.2.1.1.1.2
              indexes:
              - labelname: bsnDot11EssIndex
                type: gauge
              lookups:
              - labels:
                - bsnDot11EssIndex
                labelname: bsnDot11EssSsid
                oid: 1.3.6.1.4.1.14179.2.1.1.1.2
                type: DisplayString
            max_repetitions: 25
            retries: 3
            timeout: 5s
            filters:
            - oid: 1.3.6.1.2.1.2.2.1.7
              targets:
              - 1.3.6.1.2.1.2.2.1.4
              values:
              - "1"
              - "2"
      serviceMonitor:
        enabled: true
        params:
        - name: pysnmp
          target: demo.pysnmp.com
    prometheusSpec:
      additionalScrapeConfigs:
      - job_name: 'snmp'
        static_configs:
        - targets:
          - demo.pysnmp.com
        metrics_path: /snmp
        params:
          auth: [public_v2]
          module: [if_mib]
        relabel_configs:
        - source_labels: [__address__]
          target_label: __param_target
        - source_labels: [__param_target]
          target_label: instance
        - target_label: __address__
          replacement: 127.0.0.1:9116 # The SNMP exporter's real hostname:port.
      # Global exporter-level metrics
      - job_name: 'snmp_exporter'
        static_configs:
        - targets: ['localhost:9116']
grafana:
  sso:
    enabled: true
    grafana:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-grafana
      scopes: "openid Grafana"
jaeger:
  enabled: true
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-jaeger
kiali:
  enabled: true
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-kiali
addons:
  authservice:
    enabled: true
```
