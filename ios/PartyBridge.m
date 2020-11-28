//
//  PartyBridge.m
//  Pokedex
//
//  Created by Sean McGovern on 9/21/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PartyBridge, NSObject)

RCT_EXTERN_METHOD(createPartyWithItem: (NSString)title item:(NSDictionary)item partyId:(nonnull NSNumber)partyId)

RCT_EXTERN_METHOD(getParties: (RCTResponseSenderBlock)callback)

@end
