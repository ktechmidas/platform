// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: platform.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers.h>
#else
 #import "GPBProtocolBuffers.h"
#endif

#if GOOGLE_PROTOBUF_OBJC_VERSION < 30002
#error This file was generated by a newer version of protoc which is incompatible with your Protocol Buffer library sources.
#endif
#if 30002 < GOOGLE_PROTOBUF_OBJC_MIN_SUPPORTED_VERSION
#error This file was generated by an older version of protoc which is incompatible with your Protocol Buffer library sources.
#endif

// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

CF_EXTERN_C_BEGIN

@class Proof;

NS_ASSUME_NONNULL_BEGIN

#pragma mark - PlatformRoot

/**
 * Exposes the extension registry for this file.
 *
 * The base class provides:
 * @code
 *   + (GPBExtensionRegistry *)extensionRegistry;
 * @endcode
 * which is a @c GPBExtensionRegistry that includes all the extensions defined by
 * this file and all files that it depends on.
 **/
@interface PlatformRoot : GPBRootObject
@end

#pragma mark - Proof

typedef GPB_ENUM(Proof_FieldNumber) {
  Proof_FieldNumber_RootTreeProof = 1,
  Proof_FieldNumber_StoreTreeProof = 2,
};

@interface Proof : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *rootTreeProof;

@property(nonatomic, readwrite, copy, null_resettable) NSData *storeTreeProof;

@end

#pragma mark - BroadcastStateTransitionRequest

typedef GPB_ENUM(BroadcastStateTransitionRequest_FieldNumber) {
  BroadcastStateTransitionRequest_FieldNumber_StateTransition = 1,
};

@interface BroadcastStateTransitionRequest : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *stateTransition;

@end

#pragma mark - BroadcastStateTransitionResponse

@interface BroadcastStateTransitionResponse : GPBMessage

@end

#pragma mark - GetIdentityRequest

typedef GPB_ENUM(GetIdentityRequest_FieldNumber) {
  GetIdentityRequest_FieldNumber_Id_p = 1,
  GetIdentityRequest_FieldNumber_Prove = 2,
};

@interface GetIdentityRequest : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *id_p;

@property(nonatomic, readwrite) BOOL prove;

@end

#pragma mark - GetIdentityResponse

typedef GPB_ENUM(GetIdentityResponse_FieldNumber) {
  GetIdentityResponse_FieldNumber_Identity = 1,
  GetIdentityResponse_FieldNumber_Proof = 2,
};

@interface GetIdentityResponse : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *identity;

@property(nonatomic, readwrite, strong, null_resettable) Proof *proof;
/** Test to see if @c proof has been set. */
@property(nonatomic, readwrite) BOOL hasProof;

@end

#pragma mark - GetDataContractRequest

typedef GPB_ENUM(GetDataContractRequest_FieldNumber) {
  GetDataContractRequest_FieldNumber_Id_p = 1,
  GetDataContractRequest_FieldNumber_Prove = 2,
};

@interface GetDataContractRequest : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *id_p;

@property(nonatomic, readwrite) BOOL prove;

@end

#pragma mark - GetDataContractResponse

typedef GPB_ENUM(GetDataContractResponse_FieldNumber) {
  GetDataContractResponse_FieldNumber_DataContract = 1,
  GetDataContractResponse_FieldNumber_Proof = 2,
};

@interface GetDataContractResponse : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *dataContract;

@property(nonatomic, readwrite, strong, null_resettable) Proof *proof;
/** Test to see if @c proof has been set. */
@property(nonatomic, readwrite) BOOL hasProof;

@end

#pragma mark - GetDocumentsRequest

typedef GPB_ENUM(GetDocumentsRequest_FieldNumber) {
  GetDocumentsRequest_FieldNumber_DataContractId = 1,
  GetDocumentsRequest_FieldNumber_DocumentType = 2,
  GetDocumentsRequest_FieldNumber_Where = 3,
  GetDocumentsRequest_FieldNumber_OrderBy = 4,
  GetDocumentsRequest_FieldNumber_Limit = 5,
  GetDocumentsRequest_FieldNumber_StartAfter = 6,
  GetDocumentsRequest_FieldNumber_StartAt = 7,
  GetDocumentsRequest_FieldNumber_Prove = 8,
};

typedef GPB_ENUM(GetDocumentsRequest_Start_OneOfCase) {
  GetDocumentsRequest_Start_OneOfCase_GPBUnsetOneOfCase = 0,
  GetDocumentsRequest_Start_OneOfCase_StartAfter = 6,
  GetDocumentsRequest_Start_OneOfCase_StartAt = 7,
};

@interface GetDocumentsRequest : GPBMessage

@property(nonatomic, readwrite, copy, null_resettable) NSData *dataContractId;

@property(nonatomic, readwrite, copy, null_resettable) NSString *documentType;

@property(nonatomic, readwrite, copy, null_resettable) NSData *where;

@property(nonatomic, readwrite, copy, null_resettable) NSData *orderBy;

@property(nonatomic, readwrite) uint32_t limit;

@property(nonatomic, readonly) GetDocumentsRequest_Start_OneOfCase startOneOfCase;

@property(nonatomic, readwrite) uint32_t startAfter;

@property(nonatomic, readwrite) uint32_t startAt;

@property(nonatomic, readwrite) BOOL prove;

@end

/**
 * Clears whatever value was set for the oneof 'start'.
 **/
void GetDocumentsRequest_ClearStartOneOfCase(GetDocumentsRequest *message);

#pragma mark - GetDocumentsResponse

typedef GPB_ENUM(GetDocumentsResponse_FieldNumber) {
  GetDocumentsResponse_FieldNumber_DocumentsArray = 1,
  GetDocumentsResponse_FieldNumber_Proof = 2,
};

@interface GetDocumentsResponse : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSData*> *documentsArray;
/** The number of items in @c documentsArray without causing the array to be created. */
@property(nonatomic, readonly) NSUInteger documentsArray_Count;

@property(nonatomic, readwrite, strong, null_resettable) Proof *proof;
/** Test to see if @c proof has been set. */
@property(nonatomic, readwrite) BOOL hasProof;

@end

#pragma mark - GetIdentitiesByPublicKeyHashesRequest

typedef GPB_ENUM(GetIdentitiesByPublicKeyHashesRequest_FieldNumber) {
  GetIdentitiesByPublicKeyHashesRequest_FieldNumber_PublicKeyHashesArray = 1,
  GetIdentitiesByPublicKeyHashesRequest_FieldNumber_Prove = 2,
};

@interface GetIdentitiesByPublicKeyHashesRequest : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSData*> *publicKeyHashesArray;
/** The number of items in @c publicKeyHashesArray without causing the array to be created. */
@property(nonatomic, readonly) NSUInteger publicKeyHashesArray_Count;

@property(nonatomic, readwrite) BOOL prove;

@end

#pragma mark - GetIdentitiesByPublicKeyHashesResponse

typedef GPB_ENUM(GetIdentitiesByPublicKeyHashesResponse_FieldNumber) {
  GetIdentitiesByPublicKeyHashesResponse_FieldNumber_IdentitiesArray = 1,
  GetIdentitiesByPublicKeyHashesResponse_FieldNumber_Proof = 2,
};

@interface GetIdentitiesByPublicKeyHashesResponse : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSData*> *identitiesArray;
/** The number of items in @c identitiesArray without causing the array to be created. */
@property(nonatomic, readonly) NSUInteger identitiesArray_Count;

@property(nonatomic, readwrite, strong, null_resettable) Proof *proof;
/** Test to see if @c proof has been set. */
@property(nonatomic, readwrite) BOOL hasProof;

@end

#pragma mark - GetIdentityIdsByPublicKeyHashesRequest

typedef GPB_ENUM(GetIdentityIdsByPublicKeyHashesRequest_FieldNumber) {
  GetIdentityIdsByPublicKeyHashesRequest_FieldNumber_PublicKeyHashesArray = 1,
  GetIdentityIdsByPublicKeyHashesRequest_FieldNumber_Prove = 2,
};

@interface GetIdentityIdsByPublicKeyHashesRequest : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSData*> *publicKeyHashesArray;
/** The number of items in @c publicKeyHashesArray without causing the array to be created. */
@property(nonatomic, readonly) NSUInteger publicKeyHashesArray_Count;

@property(nonatomic, readwrite) BOOL prove;

@end

#pragma mark - GetIdentityIdsByPublicKeyHashesResponse

typedef GPB_ENUM(GetIdentityIdsByPublicKeyHashesResponse_FieldNumber) {
  GetIdentityIdsByPublicKeyHashesResponse_FieldNumber_IdentityIdsArray = 1,
  GetIdentityIdsByPublicKeyHashesResponse_FieldNumber_Proof = 2,
};

@interface GetIdentityIdsByPublicKeyHashesResponse : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSData*> *identityIdsArray;
/** The number of items in @c identityIdsArray without causing the array to be created. */
@property(nonatomic, readonly) NSUInteger identityIdsArray_Count;

@property(nonatomic, readwrite, strong, null_resettable) Proof *proof;
/** Test to see if @c proof has been set. */
@property(nonatomic, readwrite) BOOL hasProof;

@end

NS_ASSUME_NONNULL_END

CF_EXTERN_C_END

#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)
